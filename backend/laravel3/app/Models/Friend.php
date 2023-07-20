<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    protected $table = 'friends';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'friend_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }

    public function lastMessage()
    {
        return $this->hasOne(Chat::class, 'sender_id', 'user_id')
            ->where('recipient_id', $this->friend_id)
            ->orWhere(function ($query) {
                $query->where('sender_id', $this->friend_id)
                    ->where('recipient_id', $this->user_id);
            })
            ->latest()
            ->withDefault();
    }
}
