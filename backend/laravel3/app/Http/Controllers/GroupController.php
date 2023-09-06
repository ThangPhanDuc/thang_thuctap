<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Group;
use App\Models\GroupInvitation;
use App\Models\GroupRequest;

class GroupController extends Controller
{
    public function createGroup(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'privacy' => 'in:public,private',
        ]);


        $group = new Group();
        $group->name = $request->input('name');
        $group->privacy = $request->input('privacy', 'public');
        $group->save();
        return response()->json("Group has been successfully created");
    }

    public function inviteToGroup(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $group = Group::find($request->group_id);

        if (!$group) {
            return response()->json("Group not found", 404);
        }

        $existingInvitation = GroupInvitation::where('group_id', $group->id)
            ->where('receiver_id', $request->input('user_id'))
            ->first();

        if ($existingInvitation) {
            return response()->json("User has already been invited to this group");
        }

        $invitation = new GroupInvitation();
        $invitation->group_id = $group->id;
        $invitation->sender_id = $request->user()->id;
        $invitation->receiver_id = $request->input('user_id');
        $invitation->status = 'pending';
        $invitation->save();

        return response()->json("Invitation has been sent successfully");
    }

    public function requestToJoinGroup(Request $request,)
    {
        $user = Auth::user();

        $group = Group::find($request->group_id);

        if (!$group) {
            return response()->json("Group not found", 404);
        }


        $existingRequest = GroupRequest::where('group_id', $group->id)
            ->where('user_id', $request->input('user_id'))
            ->first();

        if ($existingRequest) {
            return response()->json("User has already sent a request to join this group");
        }

        $groupRequest = new GroupRequest();
        $groupRequest->group_id = $group->id;
        $groupRequest->user_id = $user->id;
        $groupRequest->status = 'pending';
        $groupRequest->save();

        return response()->json("Request to join the group has been sent successfully");
    }

    public function getGroupRequests(Request $request, $groupId)
    {
        $group = Group::find($groupId);

        if (!$group) {
            return response()->json("Group not found", 404);
        }

       
        $pendingRequests = $group->pendingJoinRequests()->paginate(5);

        return response()->json($pendingRequests);
    }
}
