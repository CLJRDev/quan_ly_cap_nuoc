<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMCoDongHoModel extends Model
{
    use HasFactory;
    protected $table = 'dm_codongho';
    public $incrementing = true;
    protected $primaryKey = 'ma_co_dong_ho';
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
