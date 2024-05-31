<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LSDongHoKhoiModel;
use App\Models\QLHoaDonModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BaoCaoController extends Controller
{
    public function bc_that_thoat(Request $request){
        $query=QLHoaDonModel::select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_hopdong.dia_chi as dia_chi_hop_dong','dm_tuyendoc.ma_tuyen','ql_khachhang.ten_khach_hang','ql_khachhang.ma_khach_hang','ql_khachhang.sdt','ql_nhomgia.gia_ban','ql_nhomgia.hs_thue','ql_khachhang.dia_chi as dia_chi_khach','ql_khachhang.email')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
        ->join('ql_nhomgia','ql_hopdong.ma_nhom_gia','=','ql_nhomgia.ma_nhom_gia')
            // ->whereRaw('ql_hoadon.tu_ngay<='.date("Y-m-d").' and ql_hoadon.den_ngay>='.date("Y-m-d"))
        ->where('ma_hoa_don',$request->ma_hoa_don)->first();
        // LSDongHoKhoiModel::selectRaw('ky_chi_so,ls_donghokhoi.so_tieu_thu as dhkhoi_tieu_thu,sum(ql_hoadon.so_tieu_thu) as dhkhach_tieu_thu,(ls_donghokhoi.so_tieu_thu-ql_hoadon.so_tieu_thu) as that_thoat, ql_lapdatdhkhoi.ma_tuyen, ql_lapdatdhkhoi.ma_dong_ho')
        // ->leftJoin('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
        // ->leftJoin('dm_tuyendoc','ql_lapdatdhkhoi.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        // ->leftJoin('ql_hopdong','ql_hopdong.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        // ->leftJoin('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_hop_dong','=','ql_hopdong.ma_hop_dong')
        // ->leftJoin('ql_hoadon','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        // ->groupBy('ql_lapdatdhkhoi.ma_tuyen')
        // ->where('ls_donghokhoi.ky_chi_so','ql_hoadon.ky_hoa_don');
        if($request->has('ma_tuyen')){
            $query->where('dm_tuyendoc.ma_tuyen',$request->ma_tuyen);
        }
        if($request->has('ky_chi_so')){
            $query->where("ls_donghokhoi.ky_chi_so","like","%".$request->ky_chi_so."%");
        }
        return $query;
    }
    public function bc_thu_tien(Request $request){
        $query=QLHoaDonModel::selectRaw('ql_hoadon.ky_hoa_don,dm_tuyendoc.ma_tuyen,sum(tong_cong) as tong_cong')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('dm_tuyendoc','ql_hopdong.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->groupBy('dm_tuyendoc.ma_tuyen','ql_hoadon.ky_hoa_don');
        if($request->has('ma_tuyen')){
            $query->where('dm_tuyendoc.ma_tuyen',$request->ma_tuyen);
        }
        if($request->has('ky_hoa_don')){
            $query->where("ql_hoadon.ky_hoa_don","like","%".$request->ky_hoa_don."%");
        }
        return $query->get();
    }
    public function bc_kh_chua_dong(Request $request){
        $query=QLHoaDonModel::selectRaw('ql_khachhang.*, sum(tong_cong) as tong_cong')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->groupBy('ql_khachhang.ma_khach_hang','ql_khachhang.ten_khach_hang','ql_khachhang.sdt','ql_khachhang.can_cuoc','ql_khachhang.email','ql_khachhang.dia_chi')
        ->whereRaw('ma_phuong_thuc is null');
        if($request->has('ma_loai_khach_hang')){
            $query->where('ma_loai_khach_hang',$request->ma_loai_khach_hang);
        }
        return $query->get();
    }
    public function bc_bat_thuong(Request $request){
        $query=QLHoaDonModel::selectRaw('ql_hoadon.*')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_lapdatdhkhach.ma_dong_ho','=','ql_donghokhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->whereRaw('ql_hoadon.so_tieu_thu>20');
        if($request->has('ma_loai_dong_ho')){
            $query->where('ma_loai_dong_ho',$request->ma_loai_dong_ho);
        }
        return $query->get();
    }
    public function bc_thu_doc(Request $request){
        $query=QLHoaDonModel::selectRaw('ql_hoadon.*')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_lapdatdhkhach.ma_dong_ho','=','ql_donghokhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->join('dm_tuyendoc','ql_hopdong.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->whereRaw('ql_hoadon.khoa=0');
        if($request->has('ma_tuyen')){
            $query->where('ma_tuyen',$request->ma_tuyen);
        }
        return $query->get();
    }
}
