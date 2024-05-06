<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMChiNhanhModel extends Model
{
    use HasFactory;
    protected $table = 'dm_chinhanh';
    public $incrementing = true;
    protected $primaryKey = 'ma_chi_nhanh';
    protected $keytype = 'int';
    public $timestamps = false;
    // public function phuong_xa()
    // {
    //   return $this->hasMany(DMPhuongXaModel::class);
    // }
}
