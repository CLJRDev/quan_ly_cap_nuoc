<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LSDongHoKhoiModel;
use App\Models\QLHoaDonModel;
use Illuminate\Http\Request;

class BaoCaoController extends Controller
{
    public function bc_that_thoat(Request $request){
        $query=LSDongHoKhoiModel::selectRaw('ky_chi_so,ls_donghokhoi.so_tieu_thu as dhkhoi_tieu_thu,ql_hoadon.so_tieu_thu as dhkhach_tieu_thu,(ls_donghokhoi.so_tieu_thu-ql_hoadon.so_tieu_thu) as that_thoat, dm_tuyendoc.ma_tuyen')
        ->leftJoin('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
        ->join('dm_tuyendoc','ql_lapdatdhkhoi.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->join('ql_hopdong','ql_hopdong.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_hop_dong','=','ql_hopdong.ma_hop_dong')
        ->join('ql_hoadon','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->groupBy('dm_tuyendoc.ma_tuyen')
        ->where('ls_donghokhoi.ky_chi_so','ql_hoadon.ky_hoa_don');
        if($request->has('ma_tuyen')){
            $query->where('dm_tuyendoc.ma_tuyen',$request->ma_tuyen);
        }
        if($request->has('ky_chi_so')){
            $query->where("ls_donghokhoi.ky_chi_so","like","%".$request->ky_chi_so."%");
        }
        return $query->get();
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
    public function bc_kh_chua_dong(){
        $query=0;
    }
    public function bc_bat_thuong(){
        // $query=QLHoaDonModel::query()->select('');
    }
}
