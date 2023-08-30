<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';
    protected $primaryKey = 'id';
    public $timestamps = true;

    // protected $fillable = [
    //     'sender_id',
    //     'type',
    //     'related_id'
    // ];

    protected $fillable = [
        'recipient_id',
        'sender_id', 
        'type',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipient()
    {
        return $this->user;
    }

    public function likeNotification()
    {
        return $this->hasOne(NotificationLike::class);
    }

    public function commentNotification()
    {
        return $this->hasOne(NotificationComment::class);
    }

    public function friendRequestNotification()
    {
        return $this->hasOne(NotificationFriend::class);
    }
}
