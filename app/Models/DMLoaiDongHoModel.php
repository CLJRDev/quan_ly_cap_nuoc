<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMLoaiDongHoModel extends Model
{
    use HasFactory;
    protected $table = 'dm_loaidongho';
    public $incrementing = true;
    protected $primaryKey = 'ma_loai_dong_ho';
    protected $keytype = 'int';
    public $timestamps = false;
    public function dong_ho_khoi()
    {
      return $this->hasMany(QLDongHoKhoiModel::class);
    }
    public function dong_ho_khach()
    {
      return $this->hasMany(QLDongHoKhachModel::class);
    }
}
