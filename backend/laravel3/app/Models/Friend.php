<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    protected $table = 'friends';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'userId_1',
        'userId_2',
    ];

    public function user1()
    {
        return $this->belongsTo(User::class, 'userId_1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'userId_2');
    }

    
   
}
