<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLGiaNuocModel extends Model
{
    use HasFactory;
    protected $table = 'ql_nhomgia';
    public $incrementing = true;
    protected $primaryKey = 'ma_nhom_gia';
    protected $keytype = 'int';
    public $timestamps = false;
    public function loai_khach_hang()
    {
      return $this->hasOne(DMLoaiKhachHangModel::class);
    }
    public function hop_dong()
    {
      return $this->hasMany(QLHopDongModel::class);
    }
}
