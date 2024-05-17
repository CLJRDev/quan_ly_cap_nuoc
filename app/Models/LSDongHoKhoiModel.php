<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LSDongHoKhoiModel extends Model
{
    use HasFactory;
    protected $table = 'ls_donghokhoi';
    public $incrementing = true;
    protected $primaryKey = 'ma_lich_su';
    protected $keytype = 'int';
    public $timestamps = false;
    public function lap_dat()
    {
      return $this->hasOne(QLLapDatDHKhoiModel::class);
    }
}
