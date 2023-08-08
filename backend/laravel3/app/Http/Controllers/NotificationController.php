<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;
use App\Models\Like;
use Illuminate\Pagination\Paginator;

class NotificationController extends Controller
{
    public function getNotification(Request $request)
    {
        $user = Auth::user();
        $notifications = $user->notifications()->orderBy('created_at', 'desc')->paginate(10);

        foreach ($notifications as $notification) {
            switch ($notification->type) {
                case 'like_notification':
                    $data =   [
                        'userLike' => $notification->sender,
                        'post_id' => $notification->likeNotification->like->post_id,
                    ];
                    $notification->setAttribute('data', $data);
                    break;
                case 'comment_notification':
                    $data =   [
                        'userComment' => $notification->sender,
                        'post_id' => $notification->commentNotification->comment->post_id,
                        'content' => $notification->commentNotification->comment->content,
                    ];
                    $notification->setAttribute('data', $data);
                    break;
                case 'friend_request_notification':
                    $data =   [
                        'sender' => $notification->sender,
                    ];
                    $notification->setAttribute('data', $data);
                    break;
                default:
                    break;
            }
        }

        return response()->json($notifications);
    }
}
