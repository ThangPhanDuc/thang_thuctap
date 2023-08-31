<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class VideoComment extends Model
{
    use HasFactory;

    protected $table = 'video_comments';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'video_id',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function video()
    {
        return $this->belongsTo(Video::class, 'video_id');
    }

    public function getCreatedAtAttribute($value)
    {
        $dateTime = Carbon::parse($value);
        $vietnamDateTime = $dateTime->addHours(0)->setTimezone('Asia/Ho_Chi_Minh');
        return $vietnamDateTime->format('H:i:s d/m/Y');
    }

    public function getUpdatedAtAttribute($value)
    {
        $dateTime = Carbon::parse($value);
        $vietnamDateTime = $dateTime->addHours(0)->setTimezone('Asia/Ho_Chi_Minh');
        return $vietnamDateTime->format('H:i:s d/m/Y');
    }
}
