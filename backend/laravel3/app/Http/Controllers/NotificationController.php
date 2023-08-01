<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;
use Illuminate\Pagination\Paginator;

class NotificationController extends Controller
{
    public function getNotification(Request $request){
        $user = Auth::user();
        $notifications = $user->notifications()->paginate(10);
        return $notifications;
    }
}
