<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_info_id',
        'name',
    ];

    public function userInfo()
    {
        return $this->belongsTo(UserInfo::class, 'user_info_id');
    }
}
