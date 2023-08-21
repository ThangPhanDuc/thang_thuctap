<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatingInvitation extends Model
{
    use HasFactory;

    protected $table = 'dating_invitations';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'sender_id',
        'receiver_id',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
