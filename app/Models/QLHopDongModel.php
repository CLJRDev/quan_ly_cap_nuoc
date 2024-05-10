<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLHopDongModel extends Model
{
    use HasFactory;
    protected $table = 'ql_hopdong';
    public $incrementing = true;
    protected $primaryKey = 'ma_hop_dong';
    protected $keytype = 'int';
    public $timestamps = false;
}
