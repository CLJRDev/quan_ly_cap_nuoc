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
        $hoa_dons = QLHoaDonModel::select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_hopdong.dia_chi as dia_chi_hop_dong','dm_tuyendoc.ma_tuyen','ql_khachhang.ten_khach_hang','ql_khachhang.ma_khach_hang','ql_khachhang.sdt','ql_nhomgia.gia_ban','ql_nhomgia.hs_thue','ql_khachhang.dia_chi as dia_chi_khach','ql_khachhang.email')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
        ->join('ql_nhomgia','ql_hopdong.ma_nhom_gia','=','ql_nhomgia.ma_nhom_gia')
            ->whereRaw('ql_hoadon.tu_ngay<='.date("Y-m-d").' and ql_hoadon.den_ngay>='.date("Y-m-d").' and ql_hoadon.so_tieu_thu>0')
            ->get();
        if(count($hoa_dons)!=0){
            foreach($hoa_dons as $hoa_don){
                $hoa_don->khoa=1;
                $thong_tin = [
                    'ma_hoa_don' => $hoa_don->ma_hoa_don,
                    'ky_hoa_don' => $hoa_don->ky_hoa_don,
                    'chi_so_cu' => $hoa_don->chi_so_cu,
                    'chi_so_moi' => $hoa_don->chi_so_moi,
                    'so_tieu_thu' => $hoa_don->so_tieu_thu,
                    'tong_tien_thue' => $hoa_don->tong_tien_thue,
                    'tong_tien_truoc_thue' => $hoa_don->tong_tien_truoc_thue,
                    'tong_cong' => $hoa_don->tong_cong,
                    'email' => $hoa_don->email,
                    'tu_ngay' => $hoa_don->tu_ngay,
                    'den_ngay' => $hoa_don->den_ngay,
                    'ma_hop_dong' => $hoa_don->ma_hop_dong,
                    'dia_chi_khach' => $hoa_don->dia_chi_khach,
                    'dia_chi_hop_dong' => $hoa_don->dia_chi_hop_dong,
                    'ten_tuyen' => $hoa_don->ten_tuyen,
                    'ten_khach_hang' => $hoa_don->ten_khach_hang,
                    'ma_khach_hang' => $hoa_don->ma_khach_hang,
                    'sdt' => $hoa_don->sdt,
                    'gia_ban' => $hoa_don->gia_ban,
                    'hs_thue' => $hoa_don->hs_thue,
                    'day'=> date("d"),
                    'month' => date("m"),
                    'year' => date("Y"),
                    ];
                Mail::to('mashiro1420@gmail.com')->send(new HoaDonMail($thong_tin));
            }
        }
    }
}
