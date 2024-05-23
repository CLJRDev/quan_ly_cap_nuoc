<?php

namespace App\Console\Commands;

use App\Mail\HoaDonMail;
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
        $khach_hang = QLKhachHangModel::select('ql_khachhang.email','ql_hoadon.tu_ngay','ql_hoadon.den_ngay')
            ->join('ql_hopdong','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
            ->join('ql_lapdatdhkhach','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_hoadon','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
            ->whereRaw('ql_hoadon.tu_ngay<='.date("Y-m-d").' and ql_hoadon.den_ngay>='.date("Y-m-d"))->get();
        // if(count($khach_hang)!=0){
        //     foreach($khach_hang as $hoa_don){
        //         $thong_tin = [
        //             'email' => $hoa_don->email,
        //             'tu_ngay' => $hoa_don->tu_ngay,
        //             'den_ngay' => $hoa_don->den_ngay,
        //             ];
        //         Mail::to($hoa_don->email)->send(new HoaDonMail($thong_tin));
        //         return 'yes '.$hoa_don;
        //     }
        // }
        $thong_tin = 1;
        Mail::to('mashiro1420@gmail.com')->send(new HoaDonMail($thong_tin));
    }
}
