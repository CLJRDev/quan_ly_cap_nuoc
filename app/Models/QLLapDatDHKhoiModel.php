<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLLapDatDHKhoiModel extends Model
{
    use HasFactory;
    protected $table = 'ql_lapdatdhkhoi';
    public $incrementing = true;
    protected $primaryKey = 'ma_lap_dat';
    protected $keytype = 'int';
    public $timestamps = false;
}
