<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            [
                'name' => 'First Purchase',
                'description' => 'Complete your first purchase',
                'required_purchases' => 1,
                'required_amount' => null,
                'badge_name' => 'Newcomer',
            ],
            [
                'name' => 'Shopping Enthusiast',
                'description' => 'Complete 5 purchases',
                'required_purchases' => 5,
                'required_amount' => null,
                'badge_name' => null,
            ],
            [
                'name' => 'Big Spender',
                'description' => 'Spend ₦10,000 in total',
                'required_purchases' => null,
                'required_amount' => 10000,
                'badge_name' => 'Silver Shopper',
            ],
            [
                'name' => 'Loyal Customer',
                'description' => 'Complete 10 purchases',
                'required_purchases' => 10,
                'required_amount' => null,
                'badge_name' => null,
            ],
            [
                'name' => 'Premium Shopper',
                'description' => 'Spend ₦50,000 in total',
                'required_purchases' => null,
                'required_amount' => 50000,
                'badge_name' => 'Gold Shopper',
            ],
            [
                'name' => 'VIP Customer',
                'description' => 'Complete 25 purchases',
                'required_purchases' => 25,
                'required_amount' => null,
                'badge_name' => null,
            ],
            [
                'name' => 'Elite Shopper',
                'description' => 'Spend ₦100,000 in total',
                'required_purchases' => null,
                'required_amount' => 100000,
                'badge_name' => 'Platinum Shopper',
            ],
            [
                'name' => 'Champion Buyer',
                'description' => 'Complete 50 purchases',
                'required_purchases' => 50,
                'required_amount' => null,
                'badge_name' => 'Diamond Shopper',
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'current_badge' => null,
        ]);
    }
}