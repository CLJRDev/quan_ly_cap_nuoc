<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LSDongHoKhachModel extends Model
{
    use HasFactory;
    protected $table = 'ls_donghokhach';
    public $incrementing = true;
    protected $primaryKey = 'ma_lich_su';
    protected $keytype = 'int';
    public $timestamps = false;
}
