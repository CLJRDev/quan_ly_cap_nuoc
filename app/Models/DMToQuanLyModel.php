<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DMToQuanLyModel extends Model
{
    use HasFactory;
    protected $table = 'dm_toquanly';
    public $incrementing = true;
    protected $primaryKey = 'ma_to_quan_ly';
    protected $keytype = 'int';
    public $timestamps = false;
    public function chi_nhanh()
    {
      return $this->hasOne(DMChiNhanhModel::class);
    }
    public function tuyen_doc()
    {
      return $this->hasMany(DMTuyenDocModel::class);
    }
}
