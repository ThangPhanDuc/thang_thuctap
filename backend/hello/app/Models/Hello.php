<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hello extends Model
{
    use HasFactory;

    protected $table = 'hellos';
    protected $primaryKey = 'id';
    public $timestamps = true;
}
