<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class QLTaiKhoanModel extends Model
{
    use HasFactory;
    protected $fillable = [
      'email',
      'sdt',
      'ho_ten',
      'mat_khau',
      'trang_thai',
      'chuc_vu',
  ];    protected $table = 'ql_taikhoan';
    public $incrementing = true;
    protected $primaryKey = 'ma_nhan_vien';
    protected $keytype = 'int';
    public $timestamps = false;
    public function quyen(): BelongsToMany
    {
      return $this->belongsToMany(DMQuyenModel::class,'ql_phanquyen', 'ma_nhan_vien', 'ma_quyen');
    }

}
