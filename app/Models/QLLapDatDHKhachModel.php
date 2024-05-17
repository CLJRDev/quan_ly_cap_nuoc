<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLLapDatDHKhachModel extends Model
{
    use HasFactory;
    protected $table = 'ql_lapdatdhkhach';
    public $incrementing = true;
    protected $primaryKey = 'ma_lap_dat';
    protected $keytype = 'int';
    public $timestamps = false;
    public function dong_ho_khach()
    {
      return $this->hasOne(QLDongHoKhachModel::class);
    }
    public function hop_dong()
    {
      return $this->hasOne(QLHopDongModel::class);
    }
    public function chi_so()
    {
      return $this->hasMany(QLHoaDonModel::class);
    }
}
