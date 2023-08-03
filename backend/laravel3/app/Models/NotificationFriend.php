<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationFriend extends Model
{
    use HasFactory;

    protected $table = 'notification_friends';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'notification_id',
        'friend_id',
    ];

    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }

    public function friend()
    {
        return $this->belongsTo(Friend::class);
    }
}
