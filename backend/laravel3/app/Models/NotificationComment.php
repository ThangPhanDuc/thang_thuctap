<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationComment extends Model
{
    use HasFactory;

    protected $table = 'notification_comments';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'notification_id',
        'comment_id',
    ];

    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
