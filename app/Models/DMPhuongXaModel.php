<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMPhuongXaModel extends Model
{
    use HasFactory;
    protected $table = 'dm_phuongxa';
    public $incrementing = true;
    protected $primaryKey = 'ma_phuong_xa';
    protected $keytype = 'int';
    public $timestamps = false;
    public function quan_huyen()
    {
      return $this->hasOne(DMQuanHuyenModel::class);
    }
    public function tuyen_doc()
    {
      return $this->hasMany(DMTuyenDocModel::class);
    }
}
