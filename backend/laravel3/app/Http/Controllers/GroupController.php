<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Group;
use App\Models\GroupInvitation;
use App\Models\GroupRequest;
use App\Models\GroupUser;

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

        $groupUserAdmin = new GroupUser();
        $groupUserAdmin->group_id = $group->id;
        $groupUserAdmin->user_id =  Auth::user()->id;
        $groupUserAdmin->role = "admin";
        $groupUserAdmin->save();

        return response()->json("Group has been successfully created");
    }
    
    public function getGroupById(Request $request, $groupId)
    {
        $group = Group::with('groupUsers.user')->find($groupId);
    
        if (!$group) {
            return response()->json("Group not found", 404);
        }
    
        return response()->json($group);
    }


    // gui loi moi tham gia group
    public function sendInvitationToJoinGroup(Request $request)
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
        $invitation->save();

        return response()->json("Invitation has been sent successfully");
    }




    //gui yeu cau tham gia group
    public function sendJoinRequestToGroup(Request $request,)
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
        $groupRequest->save();

        return response()->json("Request to join the group has been sent successfully");
    }

    //admin xu ly yeu cau tham gia group
    public function handleJoinRequestToGroup(Request $request)
    {
        $groupId = $request->group_id;
        $userId = $request->user_id;
        $isAccepted = $request->isAccepted;

        $group = Group::find($groupId);
        if (!$group) {
            return response()->json("Group not found", 404);
        }

        if (!$this->isAdminInGroup($group->id, Auth::user()->id)) {
            return response()->json("You don't have permission to approve join requests for this group");
        };

        $request = GroupRequest::where('group_id', $groupId)
            ->where('user_id', $userId)
            ->first();
        if (!$request) {
            return response()->json("Join request not found", 404);
        }

        $isMember = GroupUser::where('group_id', $groupId)
            ->where('user_id', $userId)
            ->exists();
        if ($isMember) {
            return response()->json("User is already a member of this group");
        }
        $request->delete();

        if ($isAccepted) {
            // $group->groupUsers()->attach($request->user_id, ['role' => 'member']);
            $groupUser = new GroupUser();
            $groupUser->group_id = $groupId;
            $groupUser->user_id = $request->user_id;
            $groupUser->role = 'member';
            $groupUser->save();

            return response()->json("Join request has been approved successfully");
        } else {
            return response()->json("Join request has been declined");
        }
    }

    // xu ly loi moi tham gia group
    public function handleInvitationToJoinGroup(Request $request)
    {
        $invitationId = $request->invitation_id;
        $isAccepted = $request->is_accepted;

        $invitation = GroupInvitation::find($invitationId);

        if (!$invitation) {
            return response()->json("Invitation not found", 404);
        }

        $group = $invitation->group;
        if (!$group) {
            return response()->json("Group not found", 404);
        }


        $isMember = GroupUser::where('group_id', $group->id)
            ->where('user_id', Auth::user()->id)
            ->exists();
        if ($isMember) {
            return response()->json("User is already a member of this group");
        }

        $invitation->delete();
        if ($isAccepted) {
            $groupUser = new GroupUser();
            $groupUser->group_id = $group->id;
            $groupUser->user_id = Auth::user()->id;
            $groupUser->role = 'member';
            $groupUser->save();

            return response()->json("Invitation has been accepted successfully");
        } else {

            return response()->json("Invitation has been declined");
        }
    }


    // lay cac yeu cau tham gia group
    public function getGroupRequests(Request $request, $groupId)
    {
        $group = Group::find($groupId);

        if (!$group) {
            return response()->json("Group not found", 404);
        }

        $pendingRequests = $group->joinRequests()->paginate(5);

        return response()->json($pendingRequests);
    }

    //lay cac loi moi tham gia group
    public function getUserGroupInvitations()
    {
        $user = Auth::user();

        $groupInvitations = $user->groupInvitations()
            ->with('group', "sender")
            ->paginate(10);

        return response()->json($groupInvitations);
    }


    //check admin
    private function isAdminInGroup($groupId, $userId)
    {
        $group = Group::find($groupId);

        if (!$group) {
            return false;
        }

        $isAdmin = $group->groupUsers()
            ->where('user_id', $userId)
            ->where('role', 'admin')
            ->exists();

        return $isAdmin;
    }
}
