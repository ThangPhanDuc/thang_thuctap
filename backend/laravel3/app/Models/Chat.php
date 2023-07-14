<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Carbon\Carbon;

class Chat extends Model
{
    use HasFactory;

    protected $table = 'chats';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'sender_id',
        'recipient_id',
        'content',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function getCreatedAtAttribute($value)
    {
        $dateTime = Carbon::parse($value);
        $vietnamDateTime = $dateTime->addHours(0)->setTimezone('Asia/Ho_Chi_Minh');
        return $vietnamDateTime->format('d/m/Y H:i:s');
    }
}
