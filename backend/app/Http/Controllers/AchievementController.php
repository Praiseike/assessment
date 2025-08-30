<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AchievementService;
use Illuminate\Http\JsonResponse;

class AchievementController extends Controller
{
    public function __construct(
        private AchievementService $achievementService
    ) {}

    public function getUserAchievements(User $user): JsonResponse
    {
        try {
            $data = $this->achievementService->getUserAchievementData($user);
            
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user achievements',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function simulatePurchase(User $user): JsonResponse
    {
        try {
            // Create a mock purchase for testing
            $user->purchases()->create([
                'amount' => rand(1000, 50000) / 100, 
                'status' => 'completed',
                'items' => [
                    ['name' => 'Test Product', 'quantity' => 1, 'price' => rand(1000, 50000) / 100]
                ]
            ]);

            $this->achievementService->checkAndUnlockAchievements($user);

            return response()->json([
                'success' => true,
                'message' => 'Purchase simulated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to simulate purchase',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}