<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    public function processCashback(User $user, int $amount = 300): bool
    {
        Log::info("Processing cashback payment", [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'amount' => $amount,
            'currency' => 'NGN',
            'transaction_id' => 'CB_' . uniqid(),
            'timestamp' => now()->toISOString()
        ]);

        usleep(500000); 

        $success = rand(1, 100) <= 95;

        if ($success) {
            Log::info("Cashback payment successful", [
                'user_id' => $user->id,
                'amount' => $amount
            ]);
        } else {
            Log::error("Cashback payment failed", [
                'user_id' => $user->id,
                'amount' => $amount
            ]);
        }

        return $success;
    }
}