<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Chat;
use App\Models\User;

class ChatController extends Controller
{
    public function sentMessage(Request $request)
    {
        $user = Auth::user();

        event(new Message(
            $user->id,
            $request->input('recipient_id'),
            $request->input('content')
        ));

        // $chat = new Chat();
        // $chat->sender_id = $user->id;
        // $chat->recipient_id = $request->input('recipient_id');
        // $chat->content = $request->input('content');
        // $chat->save();

        return response()->json(['status' => 'success']);
    }

    public function getMessage(Request $request)
    {
        $user = Auth::user();
        $recipient_id = $request->input('recipient_id');

        $chats = Chat::where(function ($query) use ($user, $recipient_id) {
            $query->where('sender_id', $user->id)
                ->where('recipient_id', $recipient_id);
        })
            ->orWhere(function ($query) use ($user, $recipient_id) {
                $query->where('sender_id', $recipient_id)
                    ->where('recipient_id', $user->id);
            })
            ->oldest('created_at')
            ->get();
        return $chats;
    }

    public function getLastMessage(Request $request)
    {
        $user = Auth::user();
        $recipient_id = $request->input('recipient_id');

        $chats = User::all();
        return $chats;
    }
}
