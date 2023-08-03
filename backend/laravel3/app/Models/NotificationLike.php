<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationLike extends Model
{
    use HasFactory;

    protected $table = 'notification_likes';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'notification_id',
        'like_id',
    ];

    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }

    public function like()
    {
        return $this->belongsTo(Like::class);
    }
}
