<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/updateUser', [UserController::class, 'updateUser']);

    Route::get('/getAllUser', [UserController::class, 'getAllUser']);

    Route::get('/getUserById/{id}', [UserController::class, 'getUserById']);

    Route::get('/getFriendStatusByUserId/{id}', [FriendController::class, 'getFriendStatusByUserId']);

    Route::post('/updateStatusFriend', [FriendController::class, 'updateStatusFriend']);

    Route::get('/index', [UserController::class, 'index']);

    Route::post('/message', [ChatController::class, 'message']);
});
