<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\DatingInvitation;
use App\Models\UserInfo;


class DatingController extends Controller
{
    public function getDatingList(Request $request)
    {
        $user = Auth::user();
        $userInfo = $user->userInfo;
        $datingCriteria = $user->datingCriteria;

        $minAge = $request->min_age;
        $maxAge = $request->max_age;
        $minHeight = $request->min_height;
        $maxHeight = $request->max_height;
        $interests = $request->interests;
        $education = $datingCriteria->education;
        $datingGoal = $userInfo->dating_goal;


        $datingMatches = User::where('gender', '!=', $user->gender)
            ->whereBetween('age', [$minAge, $maxAge])
            ->whereHas('userInfo', function ($query) use ($minHeight, $maxHeight) {
                $query->whereBetween('height', [$minHeight, $maxHeight]);
            })
            ->whereHas('userInfo', function ($query) use ($interests) {
                $query->where('interests', 'LIKE', "%{$interests}%");
            })
            ->when($education !== 'No Preference', function ($query) use ($education) {
                $query->whereHas('userInfo', function ($q) use ($education) {
                    $q->where('education', '=', $education);
                });
            })
            ->when($datingGoal, function ($query) use ($datingGoal) {
                $query->whereHas('userInfo', function ($q) use ($datingGoal) {
                    $q->where('dating_goal', '=', $datingGoal);
                });
            })
            ->orderByRaw("ABS(age - {$user->age})")
            ->with('userInfo')
            ->paginate(1);

        return response()->json($datingMatches);
    }

    public function sendDateInvitation(Request $request)
    {
        $user = Auth::user();
        $receiver_id = $request->receiver_id;

        $dateInvites = new DatingInvitation();
        $dateInvites->sender_id = $user->id;
        $dateInvites->receiver_id = $receiver_id;
        $dateInvites->save();

        return response()->json(['message' => 'Date invitation sent successfully'], 200);
    }

    public function getReceivedDateInvitations(Request $request)
    {
        $user = Auth::user();

        $receivedInvitations = $user->receivedDatingInvitations()->paginate(10);

        return response()->json($receivedInvitations);
    }

    public function updateDatingCriteria(Request $request){
        
    }
}
