<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

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

    ///
    // public function friends()
    // {
    //     return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
    //         ->wherePivot('status', 'accepted'); // Lấy chỉ các bạn bè đã được chấp nhận
    // }

    // public function friendRequests()
    // {
    //     return $this->belongsToMany(User::class, 'friends','friend_id',  'user_id')
    //         ->wherePivot('status', 'pending'); // Lấy chỉ các yêu cầu kết bạn đang chờ xử lý
    // }

    // public function sendFriendRequest(User $user)
    // {
    //     $this->friends()->attach($user->id, ['status' => 'pending']);
    // }

    // public function acceptFriendRequest(User $user)
    // {
    //     $this->friendRequests()->updateExistingPivot($user->id, ['status' => 'accepted']);
    // }

    // public function unfriend(User $user)
    // {
    //     $this->friends()->detach($user->id);
    //     $this->friendRequests()->detach($user->id);
    // }

    // public function friendRequestsSent()
    // {
    //     // return $this->belongsToMany(User::class, 'friend_requests', 'friend_id', 'user_id')
    //     //     ->withPivot('status')
    //     //     ->wherePivot('status', 'pending');
    //     return $this->hasMany(Friend::class, 'friend_id');
    // }

}
