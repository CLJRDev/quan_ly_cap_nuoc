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
    public function dong_ho_khoi()
    {
      return $this->hasOne(QLDongHoKhoiModel::class);
    }
    public function tuyen_doc()
    {
      return $this->hasOne(DMTuyenDocModel::class);
    }
    public function chi_so()
    {
      return $this->hasMany(LSDongHoKhoiModel::class);
    }
}
