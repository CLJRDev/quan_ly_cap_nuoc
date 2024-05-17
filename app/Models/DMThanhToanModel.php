<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMThanhToanModel extends Model
{
    use HasFactory;
    protected $table = 'dm_ptthanhtoan';
    public $incrementing = true;
    protected $primaryKey = 'ma_phuong_thuc';
    protected $keytype = 'int';
    public $timestamps = false;
    public function hoa_don()
    {
      return $this->hasMany(QLHoaDonModel::class);
    }
}
