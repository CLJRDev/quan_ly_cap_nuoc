<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLDongHoKhachModel extends Model
{
    use HasFactory;
    protected $table = 'ql_donghokhach';
    public $incrementing = true;
    protected $primaryKey = 'ma_dong_ho';
    protected $keytype = 'int';
    public $timestamps = false;
    public function co_dong_ho()
    {
      return $this->hasOne(DMCoDongHoModel::class);
    }
    public function loai_dong_ho()
    {
      return $this->hasOne(DMLoaiDongHoModel::class);
    }
    public function nha_cung_cap()
    {
      return $this->hasOne(DMNhaCungCapModel::class);
    }
    public function lap_dat()
    {
      return $this->hasMany(QLLapDatDHKhachModel::class);
    }
}
