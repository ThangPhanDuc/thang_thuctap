<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Friend;

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
            case 'delete_request':
                $success = $this->cancelFriendRequest($friendId, $userId);
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
            $friend = new Friend();
            $friend->user_id = $senderId;
            $friend->friend_id = $receiverId;
            $friend->status = "pending";
            $friend->save();
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

    private function unfriend($userId, $friendId)
    {
        Friend::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)->where('friend_id', $userId);
        })->delete();

        return ['success' => true, 'message' => 'Unfriended successfully.'];
    }

    public function getFriendList(Request $request)
    {
        $user = $request->user();
        $user_id = $user->id;
        $friends = $user->friends()->paginate(100);

        return $friends;
    }

    public function getFriendRequestsReceived()
    {
        $user = Auth::user();
        $friendRequestsSent = $user->getFriendRequestsReceived()->paginate(100);
        return $friendRequestsSent;
    }

    // public function getFriendStatusByUserId(Request $request)
    // {
    //     $id = $request->id;
    //     $friendStatus = Friend::where(function ($query) use ($id) {
    //         $query->where('user_id', $id)
    //             ->orWhere('friend_id', $id);
    //     })->get();
    //     return $friendStatus;
    // }



    // public function updateStatusFriend(Request $request)
    // {
    //     $user = Auth::user();
    //     $friend_id = $request->friend_id;
    //     $status = $request->status;

    //     switch ($status) {
    //         case "Add Friend":
    //             $friend = new Friend();
    //             $friend->user_id = $user->id;
    //             $friend->friend_id = $friend_id;
    //             $friend->status = "pending";
    //             $friend->save();
    //             return "Add friend successfully";

    //         case "Confirm":
    //             $friend = Friend::where('user_id', $friend_id)
    //                 ->where('friend_id', $user->id)
    //                 ->first();
    //             if ($friend) {
    //                 $friend->status = "accepted";
    //                 $friend->save();
    //                 return "Friend request accepted successfully";
    //             } else {
    //                 return "Friend request not found";
    //             }

    //         case "Cancel Request":
    //             Friend::where('user_id', $user->id)
    //                 ->where('friend_id', $friend_id)
    //                 ->delete();
    //             return "Friend request canceled";

    //         case "Unfriend":
    //             Friend::whereIn('user_id', [$user->id, $friend_id])
    //                 ->whereIn('friend_id', [$user->id, $friend_id])
    //                 ->delete();
    //             return "Unfriended";

    //         default:
    //             return "Invalid status";
    //     }
    // }

    // public function getFriendList(Request $request)
    // {
    //     $user = $request->user();
    //     $user_id = $user->id;

    //     $friendIds1 = Friend::where(function ($query) use ($user_id) {
    //         $query->where('user_id', $user_id);
    //     })
    //         ->where('status', 'accepted')
    //         ->pluck('friend_id')
    //         ->toArray();

    //     $friendIds2 = Friend::where(function ($query) use ($user_id) {
    //         $query->where('friend_id', $user_id);
    //     })
    //         ->where('status', 'accepted')
    //         ->pluck('user_id')
    //         ->toArray();

    //     $friendIds = array_merge($friendIds1, $friendIds2);

    //     $friends = User::whereIn('id', $friendIds)
    //         ->get();

    //     return $friends;
    // }

    // public function getFriendList(Request $request)
    // {
    //     $user = Auth::user();
    //     $friends = $user->friends()->get();
    //     return $friends;



    // }

    // public function getFriendSuggestions(Request $request)
    // {
    //     $user = $request->user();
    //     $user_id = $user->id;

    //     $friendIds = $this->getFriendListByUserId($user_id);

    //     $friendSuggestions = User::whereNotIn('id', $friendIds)->get();
    //     foreach($friendSuggestions as $friendSuggestion){
    //         $friendIdsSuggestion = $this->getFriendListByUserId($friendSuggestion->id);
    //         $MutualFriendsId = array_intersect($friendIdsSuggestion,$friendIds);

    //         $friendSuggestion->MutualFriends = count($MutualFriendsId);
    //     }

    //     return $friendSuggestion;
    // }

    // function getFriendListByUserId($user_id)
    // {

    //     $friendIds1 = Friend::where(function ($query) use ($user_id) {
    //         $query->where('user_id', $user_id);
    //     })
    //         ->where('status', 'accepted')
    //         ->pluck('friend_id')
    //         ->toArray();

    //     $friendIds2 = Friend::where(function ($query) use ($user_id) {
    //         $query->where('friend_id', $user_id);
    //     })
    //         ->where('status', 'accepted')
    //         ->pluck('user_id')
    //         ->toArray();

    //     $friendIds = array_merge($friendIds1, $friendIds2);

    //     return $friendIds;
    // }
}
