<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LSGiaNuocModel extends Model
{
    use HasFactory;
    protected $table = 'ls_nhomgia';
    public $incrementing = true;
    protected $primaryKey = 'ma_lich_su';
    protected $keytype = 'int';
    public $timestamps = false;
}
