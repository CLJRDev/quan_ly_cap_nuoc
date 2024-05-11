<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLDongHoKhoiModel extends Model
{
    use HasFactory;
    protected $table = 'ql_donghokhoi';
    public $incrementing = true;
    protected $primaryKey = 'ma_dong_ho';
    protected $keytype = 'int';
    public $timestamps = false;
    // public function loai_khach_hang()
    // {
    //   return $this->hasOne(DMLoaiKhachHangModel::class);
    // }
}
