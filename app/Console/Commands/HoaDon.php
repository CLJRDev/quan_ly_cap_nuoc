<?php

namespace App\Console\Commands;

use App\Mail\HoaDonMail;
use App\Models\QLHoaDonModel;
use App\Models\QLKhachHangModel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class HoaDon extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hoa_don';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        info("Cron Job running at ". now());
        $hoa_dons = QLHoaDonModel::select('ql_hoadon.*','ql_khachhang.email')
            ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
            ->whereRaw('ql_hoadon.tu_ngay<='.date("Y-m-d").' and ql_hoadon.den_ngay>='.date("Y-m-d"))->get();
        if(count($hoa_dons)!=0){
            foreach($hoa_dons as $hoa_don){
                $hoa_don->khoa=1;
                $thong_tin = [
                    'email' => $hoa_don->email,
                    'tu_ngay' => $hoa_don->tu_ngay,
                    'den_ngay' => $hoa_don->den_ngay,
                    ];
                Mail::to($hoa_don->email)->send(new HoaDonMail($thong_tin));
            }
        }
    }
}
