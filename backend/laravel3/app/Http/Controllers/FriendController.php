<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Friend;
use App\Models\Notification;
use App\Models\NotificationFriend;
use App\Events\NotificationEvent;


class FriendController extends Controller
{
    public function manageFriendRequest(Request $request)
    {
        $action = $request->input('action');
        $userId = Auth::user()->id;
        $friendId = $request->input('friend_id');

        switch ($action) {
            case 'send_request':
                $success = $this->sendFriendRequest($userId, $friendId);
                break;
            case 'accept_request':
                $success = $this->acceptFriendRequest($userId, $friendId);
                break;
            case 'cancel_request':
                $success = $this->cancelFriendRequest($userId, $friendId);
                break;
            case 'reject_request':
                $success = $this->rejectFriendRequest($userId, $friendId);
                // $success = $this->cancelFriendRequest($friendId, $userId);
                break;
            case 'unfriend':
                $success = $this->unfriend($userId, $friendId);
                break;
            default:
                $success = false;
                break;
        }

        if ($success) {
            return response()->json(['message' => 'Success'], 200);
        } else {
            return response()->json(['message' => 'Failed'], 500);
        }
    }

    private function sendFriendRequest($senderId, $receiverId)
    {
        $existingRequest = Friend::where(function ($query) use ($senderId, $receiverId) {
            $query->where('user_id', $senderId)->where('friend_id', $receiverId);
        })->orWhere(function ($query) use ($senderId, $receiverId) {
            $query->where('user_id', $receiverId)->where('friend_id', $senderId);
        })->first();

        if ($existingRequest) {
            $existingRequest->update(['status' => 'pending']);
        } else {
            $sender = User::where("id", $senderId)->first();
            $data =   [
                'sender' => $sender,
            ];

            event(new NotificationEvent(
                $receiverId,
                "friend_request_notification",
                $data,
            ));

            $friend = new Friend();
            $friend->user_id = $senderId;
            $friend->friend_id = $receiverId;
            $friend->status = "pending";
            $friend->save();

            $notification = new Notification();
            $notification->sender_id = $senderId;
            $notification->recipient_id =  $receiverId;
            $notification->type = "friend_request_notification";
            $notification->save();

            // $notificationFriend = new NotificationFriend();
            // $notificationFriend->notification_id = $notification->id;
            // $notificationFriend->friend_id = $;
            // $notificationFriend->save();

       

            // Friend::create([
            //     'user_id' => $senderId,
            //     'friend_id' => $receiverId,
            //     'status' => 'pending',
            // ]);
        }



        return ['success' => true, 'message' => 'Friend request sent successfully.'];
    }

    private function acceptFriendRequest($userId, $friendId)
    {
        $pendingRequest = Friend::where('user_id', $friendId)
            ->where('friend_id', $userId)
            ->where('status', 'pending')
            ->first();

        if ($pendingRequest) {
            // $pendingRequest->update(['status' => 'accepted']);

            // Friend::create([
            //     'user_id' => $userId,
            //     'friend_id' => $friendId,
            //     'status' => 'accepted',
            // ]);

            $pendingRequest->status = "accepted";
            $pendingRequest->save();

            $friend = new Friend();
            $friend->user_id = $userId;
            $friend->friend_id = $friendId;
            $friend->status = "accepted";
            $friend->save();


            // $notification = Notification::where('user_id', $userId)
            //     ->where('data->sender->id', $friendId)
            //     ->where('type', 'friend_request_notification')
            //     ->first();

            // if ($notification) {
            //     $data = $notification->data;
            //     $data['status'] = 'accepted';
            //     $notification->data = $data;
            //     $notification->save();
            // }

            // $notification->delete();

            return ['success' => true, 'message' => 'Friend request accepted.'];
        } else {
            return ['success' => false, 'message' => 'No pending friend request from this user.'];
        }
    }

    private function cancelFriendRequest($senderId, $receiverId)
    {
        Friend::where('user_id', $senderId)
            ->where('friend_id', $receiverId)
            ->where('status', 'pending')
            ->delete();

        return ['success' => true, 'message' => 'Friend request canceled.'];
    }


    private function rejectFriendRequest($userId, $friendId)
    {
        Friend::where('user_id', $friendId)
            ->where('friend_id', $userId)
            ->where('status', 'pending')
            ->delete();

        // $notification = Notification::where('user_id', $userId)
        //     ->where('data->sender->id', $friendId)
        //     ->where('type', 'friend_request_notification')
        //     ->first();

        // if ($notification) {
        //     $data = $notification->data;
        //     $data['status'] = 'reject';
        //     $notification->data = $data;
        //     $notification->save();
        // }
        // $notification->delete();

        return ['success' => true, 'message' => 'Friend request canceled.'];
    }

    private function unfriend($userId, $friendId)
    {
        Friend::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)->where('friend_id', $userId);
        })->delete();

        return ['success' => true, 'message' => 'Unfriended successfully.'];
    }

    ///

    public function getFriendList(Request $request)
    {
        $user = Auth::user();
        $friends = $user->friends()->paginate(100);
        return $friends;
    }

    public function getFriendRequestsReceived(Request $request)
    {
        $user = Auth::user();
        $friendRequestsSent = $user->getFriendRequestsReceived()->paginate(100);
        return $friendRequestsSent;
    }
}
