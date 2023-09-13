<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id')
            ->with('user', 'comments.user', 'photos', 'videos')
            ->withCount('likes')
            ->orderBy('posts.created_at', 'desc');
    }


    public function friends()
    {
        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')->wherePivot('status', 'accepted');
    }

    public function friendPosts()
    {
        return $this->hasManyThrough(
            Post::class,
            Friend::class,
            'user_id',
            'user_id',
            'id',
            'friend_id'
        )
            ->where('friends.status', 'accepted')
            ->with('user', 'comments.user', 'photos', 'videos')
            ->withCount('likes')
            ->orderBy('posts.created_at', 'desc');
    }

    //lay danh sach nhung nguoi gui loi moi ken ban den minh
    public function getFriendRequestsReceived()
    {
        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id',)
            ->wherePivot('status', 'pending');
    }

    public function postPhotos()
    {
        return $this->hasManyThrough(Photo::class, Post::class, 'user_id', 'post_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'recipient_id');
    }

    public function receivedDatingInvitations()
    {
        return $this->belongsToMany(User::class, 'dating_invitations', 'receiver_id', 'sender_id');
    }

    public function userInfo()
    {
        return $this->hasOne(UserInfo::class);
    }

    public function datingCriteria()
    {
        return $this->hasOne(DatingCriteria::class);
    }

    public function groupInvitations()
    {
        return $this->hasMany(GroupInvitation::class, 'receiver_id');
    }

    // public function groupPosts()
    // {
    //     return $this->hasManyThrough(
    //         GroupPost::class,
    //         GroupUser::class,
    //         'user_id',
    //         'group_id',
    //         'id',
    //         'group_id'
    //     )->with('photos', 'videos');
    // }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
