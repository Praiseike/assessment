<?php

use App\Http\Controllers\Api\AchievementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('users/{user}')->group(function () {
    Route::get('/achievements', [AchievementController::class, 'getUserAchievements']);
    Route::post('/simulate-purchase', [AchievementController::class, 'simulatePurchase']);
});
