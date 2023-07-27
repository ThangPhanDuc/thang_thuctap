<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Friend;

class FriendController extends Controller
{
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
