<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMLoaiKhachHangModel extends Model
{
    use HasFactory;
    protected $table = 'dm_loaikhachhang';
    public $incrementing = true;
    protected $primaryKey = 'ma_loai_khach_hang';
    protected $keytype = 'int';
    public $timestamps = false;
    public function nhom_gia()
    {
      return $this->hasMany(QLGiaNuocModel::class);
    }
}
