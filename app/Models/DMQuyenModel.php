<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class DMQuyenModel extends Model
{
    use HasFactory;
    protected $table = 'dm_quyen';
    public $incrementing = true;
    protected $primaryKey = 'ma_quyen';
    protected $keytype = 'int';
    public $timestamps = false;
    public function tai_khoan(): BelongsToMany
    {
      return $this->belongsToMany(QLTaiKhoanModel::class,'ql_phanquyen', 'ma_quyen', 'ma_nhan_vien');
    }
}
