<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLKhachHangModel extends Model
{
    use HasFactory;
    protected $table = 'ql_khachhang';
    public $incrementing = true;
    protected $primaryKey = 'ma_khach_hang';
    protected $keytype = 'int';
    public $timestamps = false;
    public function hop_dong()
    {
      return $this->hasMany(QLHopDongModel::class);
    }
}
