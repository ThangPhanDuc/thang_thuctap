<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Friend;

class FriendController extends Controller
{
    public function getFriendStatusByUserId(Request $request)
    {
        $id = $request->id;
        $friendStatus = Friend::where(function ($query) use ($id) {
            $query->where('user_id', $id)
                ->orWhere('friend_id', $id);
        })->get();
        return $friendStatus;
    }

    public function updateStatusFriend(Request $request)
    {
        $user = Auth::user();
        $friend_id = $request->friend_id;
        $status = $request->status;

        if ($status == "Add Friend") {
            $friend = new Friend();
            $friend->user_id = $user->id;
            $friend->friend_id = $friend_id;
            $friend->status = "pending";

            $friend->save();
            return "Add friend successfully";
        } else if ($status == "Confirm") {
            $friend = Friend::where('user_id',  $friend_id)
                ->where('friend_id', $user->id)
                ->first();
            if ($friend) {
                $friend->status = "accepted";
                $friend->save();
                return "Friend request accepted successfully";
            } else {
                return "Friend request not found";
            }
        } else if ($status == "Cancel Request") {
            Friend::where(function ($query) use ($user, $friend_id) {
                $query->where('user_id',  $user->id)
                    ->where('friend_id', $friend_id);
            })->delete();

            return "Friend request canceled";
        } else if ($status == "Unfriend") {
            Friend::where(function ($query) use ($user, $friend_id) {
                $query->where('user_id',   $user->id)
                    ->where('friend_id', $friend_id);
            })->delete();

            Friend::where(function ($query) use ($user, $friend_id) {
                $query->where('user_id',   $friend_id)
                    ->where('friend_id', $user->id );
            })->delete();

            return "unfriend";
        }
    }
}
