<?php

namespace App\Services;

use App\Events\AchievementUnlocked;
use App\Events\BadgeUnlocked;
use App\Models\Achievement;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AchievementService
{
    public function checkAndUnlockAchievements(User $user): void
    {
        $unlockedAchievementIds = $user->achievements->pluck('id')->toArray();
        $availableAchievements = Achievement::whereNotIn('id', $unlockedAchievementIds)->get();

        foreach ($availableAchievements as $achievement) {
            if ($this->isAchievementEligible($user, $achievement)) {
                $this->unlockAchievement($user, $achievement);
            }
        }
    }

    private function isAchievementEligible(User $user, Achievement $achievement): bool
    {
        $totalPurchases = $user->total_purchases;
        $totalSpent = $user->total_spent;

        if ($achievement->required_purchases && $totalPurchases < $achievement->required_purchases) {
            return false;
        }

        if ($achievement->required_amount && $totalSpent < $achievement->required_amount) {
            return false;
        }

        return true;
    }

    private function unlockAchievement(User $user, Achievement $achievement): void
    {
        $user->achievements()->attach($achievement->id, ['unlocked_at' => now()]);
        
        event(new AchievementUnlocked($user, $achievement));

        if ($achievement->badge_name && $user->current_badge !== $achievement->badge_name) {
            $this->unlockBadge($user, $achievement->badge_name, $achievement);
        }
    }

    private function unlockBadge(User $user, string $badgeName, Achievement $achievement): void
    {
        $user->update(['current_badge' => $badgeName]);
        
        event(new BadgeUnlocked($user, $badgeName, $achievement));
    }

    public function getUserAchievementData(User $user): array
    {
        $unlockedAchievements = $user->achievements->pluck('name')->toArray();
        $unlockedAchievementIds = $user->achievements->pluck('id')->toArray();
        
        $nextAchievements = Achievement::whereNotIn('id', $unlockedAchievementIds)
            ->orderBy('required_purchases')
            ->orderBy('required_amount')
            ->get();

        $nextBadge = $this->getNextBadge($user);
        $remainingToUnlockNextBadge = $this->getRemainingToUnlockNextBadge($user, $nextBadge);

        return [
            'unlocked_achievements' => $unlockedAchievements,
            'next_available_achievements' => $nextAchievements->pluck('name')->toArray(),
            'current_badge' => $user->current_badge ?? 'None',
            'next_badge' => $nextBadge,
            'remaining_to_unlock_next_badge' => $remainingToUnlockNextBadge,
        ];
    }

    private function getNextBadge(User $user): string
    {
        $currentBadge = $user->current_badge;
        $unlockedAchievementIds = $user->achievements->pluck('id')->toArray();
        
        $nextBadgeAchievement = Achievement::whereNotIn('id', $unlockedAchievementIds)
            ->whereNotNull('badge_name')
            ->orderBy('required_purchases')
            ->orderBy('required_amount')
            ->first();

        return $nextBadgeAchievement?->badge_name ?? 'Max Level Reached';
    }

    private function getRemainingToUnlockNextBadge(User $user, string $nextBadge): int
    {
        if ($nextBadge === 'Max Level Reached') {
            return 0;
        }

        $nextBadgeAchievement = Achievement::where('badge_name', $nextBadge)->first();
        
        if (!$nextBadgeAchievement) {
            return 0;
        }

        $remainingPurchases = max(0, $nextBadgeAchievement->required_purchases - $user->total_purchases);
        $remainingAmount = max(0, $nextBadgeAchievement->required_amount - $user->total_spent);

        return max($remainingPurchases, (int)$remainingAmount);
    }
}