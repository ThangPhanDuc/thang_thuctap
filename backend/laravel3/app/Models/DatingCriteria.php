<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatingCriteria extends Model
{
    use HasFactory;

    protected $table = 'dating_criterias';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'min_age',
        'max_age',
        'min_height',
        'max_height',
        'education',
        'relationship_status',
        'dating_goal'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
