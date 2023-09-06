<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupPostPhoto extends Model
{
    use HasFactory;

    protected $table = 'group_post_photos'; 
    protected $primaryKey = 'id'; 
    public $timestamps = true; 

    protected $fillable = [
        'group_post_id',
        'image_path',
    ];

    public function groupPost()
    {
        return $this->belongsTo(GroupPost::class, 'group_post_id');
    }
}
