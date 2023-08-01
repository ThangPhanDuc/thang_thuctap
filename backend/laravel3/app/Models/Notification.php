<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notifications';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'type',
        'data'
    ];

    protected $casts = [
        'data' => 'array', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
