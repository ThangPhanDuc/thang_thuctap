<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupPostVideo extends Model
{
    use HasFactory;

    protected $table = 'group_post_videos'; 
    protected $primaryKey = 'id'; 
    public $timestamps = true; 

    protected $fillable = [
        'group_post_id',
        'video_path',
    ];

    public function groupPost()
    {
        return $this->belongsTo(GroupPost::class, 'group_post_id');
    }
}
