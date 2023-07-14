<?php

use Illuminate\Support\Facades\Broadcast;

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

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Broadcast::channel('chat.{recipient_id}', function ($user, $recipient_id) {
//     return $user->id === (int) $recipient_id;
// });


Broadcast::channel('chat.{recipient_id}', function ($user, $recipient_id) {
    // Lets say true for the time
    return true;
});
