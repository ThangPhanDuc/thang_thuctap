<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupPost extends Model
{
    use HasFactory;

    protected $table = 'group_posts'; 
    protected $primaryKey = 'id'; 
    public $timestamps = true; 

    protected $fillable = [
        'group_id',
        'user_id',
        'content',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function photos()
    {
        return $this->hasMany(GroupPostPhoto::class, 'group_post_id');
    }

    public function videos()
    {
        return $this->hasMany(GroupPostVideo::class, 'group_post_id');
    }
    

}
