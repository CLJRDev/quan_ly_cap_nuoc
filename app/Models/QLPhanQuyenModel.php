<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLPhanQuyenModel extends Model
{
    use HasFactory;
    protected $table = 'ql_phanquyen';
    public $incrementing = false;
    protected $primaryKey = 'ma_phan_quyen';
    protected $keytype = 'int';
    public $timestamps = false;
    

}
