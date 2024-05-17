<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLHoaDonModel extends Model
{
    use HasFactory;
    protected $table = 'ql_hoadon';
    public $incrementing = true;
    protected $primaryKey = 'ma_hoa_don';
    protected $keytype = 'int';
    public $timestamps = false;
    public function lap_dat()
    {
      return $this->hasOne(QLLapDatDHKhachModel::class);
    }
    public function thanh_toan()
    {
      return $this->hasOne(DMThanhToanModel::class);
    }
}
