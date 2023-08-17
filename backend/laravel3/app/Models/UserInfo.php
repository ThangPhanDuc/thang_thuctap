<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;

    protected $table = 'user_infos';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'interests',
        'education',
        'relationship_status',
        'dating_goal',
        'height',
        'religion'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
