<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $table = 'groups';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'name',
        'group_image',
        'privacy',
    ];

    public function groupPosts()
    {
        return $this->hasMany(GroupPost::class, 'group_id');
    }

    public function groupUsers()
    {
        return $this->hasMany(GroupUser::class, 'group_id');
    }

    public function users()
    {
        return $this->groupUsers()->with('user')->get();
    }

    public function joinRequests()
    {
        return $this->hasManyThrough(User::class, GroupRequest::class, 'group_id', 'id', 'id', 'user_id');
    }
}
