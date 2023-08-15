<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\DateInvite;

class DatingController extends Controller
{
    public function getDatingList(Request $request){
        $user = Auth::user();
        $currentUserGender = $user->gender;
        
        $minAge = $request->min_age;
        $maxAge = $request->max_age;
    
        $datingMatches = User::where('gender', '!=', $currentUserGender)
                              ->whereBetween('age', [$minAge, $maxAge])
                              ->paginate(1);
        
        return response()->json($datingMatches);
        
    }

    public function sendDateInvitation(Request $request){
        $user = Auth::user();
        $receiver_id = $request->receiver_id;

        $dateInvites = new DateInvite();
        $dateInvites->sender_id = $user->id;
        $dateInvites->receiver_id = $receiver_id;
        $dateInvites->save();

        return response()->json(['message' => 'Date invitation sent successfully'], 200);
    }

    public function getReceivedDateInvitations(Request $request){
        $user = Auth::user();

        $receivedInvitations = $user->receivedDateInvites()->paginate(10);
        
        return response()->json($receivedInvitations);
    }
}
