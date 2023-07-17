<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function photos()
    {
        return $this->hasMany(Photo::class, 'post_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }

    public function likesCount()
    {
        return $this->likes()->count();
    }
}
