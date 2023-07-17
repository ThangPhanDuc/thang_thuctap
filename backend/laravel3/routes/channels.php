<?php

use Illuminate\Support\Facades\Broadcast;
use Laravel\Sanctum\Sanctum;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('message.{recipient_id}', function ($user, $recipientId) {
    // Kiểm tra xác thực người dùng và xác định liệu người dùng có quyền nghe kênh riêng tư hay không
    // Ví dụ: Kiểm tra xem $user có phải là người nhận tin nhắn với $recipientId không
    // Sanctum::actingAs($user);
    return $user->id === $recipientId;
});
