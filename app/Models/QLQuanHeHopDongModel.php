<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QLQuanHeHopDongModel extends Model
{
    use HasFactory;
    protected $table = 'ql_quanhehopdong';
    public $incrementing = false;
    protected $primaryKey = 'ma_quan_he';
    protected $keytype = 'int';
    public $timestamps = false;
}
