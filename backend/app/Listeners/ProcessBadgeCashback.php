<?php

namespace App\Listeners;

use App\Events\BadgeUnlocked;
use App\Services\PaymentService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Log;

class ProcessBadgeCashback
{
    /**
     * Create the event listener.
     */
    public function __construct(
        private PaymentService $paymentService
    ) {}
    
    /**
     * Handle the event.
     */
    public function handle(BadgeUnlocked $event): void
    {
        Log::info("Badge unlocked, processing cashback", [
            'user_id' => $event->user->id,
            'badge_name' => $event->badgeName,
            'achievement' => $event->achievement->name
        ]);

        $this->paymentService->processCashback($event->user, 300);
    }
}
