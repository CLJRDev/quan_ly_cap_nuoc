<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMTuyenDocModel extends Model
{
    use HasFactory;
    protected $table = 'dm_tuyendoc';
    public $incrementing = true;
    protected $primaryKey = 'ma_tuyen';
    protected $keytype = 'int';
    public $timestamps = false;
    public function to_quan_ly()
    {
      return $this->hasOne(DMToQuanLyModel::class);
    }
    public function phuong_xa()
    {
      return $this->hasOne(DMPhuongXaModel::class);
    }
}
