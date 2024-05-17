<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLHopDongModel extends Model
{
    use HasFactory;
    protected $table = 'ql_hopdong';
    public $incrementing = true;
    protected $primaryKey = 'ma_hop_dong';
    protected $keytype = 'int';
    public $timestamps = false;
    public function khach_hang()
    {
      return $this->hasOne(QLKhachHangModel::class);
    }
    public function tuyen_doc()
    {
      return $this->hasOne(DMTuyenDocModel::class);
    }
    public function nhom_gia()
    {
      return $this->hasOne(QLGiaNuocModel::class);
    }
}
