<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaiKhoanSocialModel extends Model
{
    use HasFactory;
    protected $fillable = [
        'ma_nhan_vien',
        'ma_social',
        'nguon_social',
        'ten_social',
    ];
    protected $table = 'ql_taikhoansocial';
    public $incrementing = true;
    protected $primaryKey = 'ma_tai_khoan';
    protected $keytype = 'int';
    public $timestamps = false;

    public function tai_khoan()
    {
        return $this->belongsTo(QLTaiKhoanModel::class);
    }
}
