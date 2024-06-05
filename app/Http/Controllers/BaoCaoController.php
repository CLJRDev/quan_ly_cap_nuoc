<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LSDongHoKhoiModel;
use App\Models\QLDongHoKhachModel;
use App\Models\QLDongHoKhoiModel;
use App\Models\QLHoaDonModel;
use App\Models\QLHopDongModel;
use App\Models\QLKhachHangModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BaoCaoController extends Controller
{
    public function bc_that_thoat(Request $request){
        $query=LSDongHoKhoiModel::selectRaw('ky_chi_so,ls_donghokhoi.so_tieu_thu as dhkhoi_tieu_thu,sum(ql_hoadon.so_tieu_thu) as dhkhach_tieu_thu,(ls_donghokhoi.so_tieu_thu-sum(ql_hoadon.so_tieu_thu)) as that_thoat, ql_lapdatdhkhoi.ma_tuyen, dm_tuyendoc.ten_tuyen, ql_lapdatdhkhoi.ma_dong_ho')
        ->leftJoin('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
        ->leftJoin('dm_tuyendoc','ql_lapdatdhkhoi.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->leftJoin('ql_hopdong','ql_hopdong.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->leftJoin('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_hop_dong','=','ql_hopdong.ma_hop_dong')
        ->leftJoin('ql_hoadon','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->groupBy('ql_lapdatdhkhoi.ma_tuyen');
        if($request->has('ma_tuyen')){
            $query->where('dm_tuyendoc.ma_tuyen',$request->ma_tuyen);
        }
        if($request->has('ky_chi_so')){
            $query->where("ls_donghokhoi.ky_chi_so","like","%".$request->ky_chi_so."%");
        }
        return $query->get();
    }
    public function bc_thu_tien(Request $request){
        $query=QLHoaDonModel::selectRaw('ql_hoadon.ky_hoa_don,dm_tuyendoc.ma_tuyen,dm_tuyendoc.ten_tuyen,sum(tong_cong) as tong_cong')
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
        $query=QLHoaDonModel::selectRaw('ql_khachhang.ma_khach_hang,ql_khachhang.ten_khach_hang,ql_hopdong.ma_hop_dong,dm_loaikhachhang.ma_loai_khach_hang ,ql_hoadon.*')
        ->leftJoin('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->leftJoin('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->leftJoin('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->leftJoin('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
        ->leftJoin('dm_loaikhachhang','ql_nhomgia.ma_loai_khach_hang','=','dm_loaikhachhang.ma_loai_khach_hang')
        ->whereRaw('ma_phuong_thuc is null and ql_hoadon.so_tieu_thu>0');
        if($request->has('ma_loai_khach_hang')){
            $query->where('ma_loai_khach_hang',$request->ma_loai_khach_hang);
        }
        if($request->has('ky_hoa_don')){
            $query->where("ql_hoadon.ky_hoa_don","like","%".$request->ky_hoa_don."%");
        }
        return $query->get();
    }
    public function bc_bat_thuong(Request $request){
        $subQuery = QLHoaDonModel::select('ma_lap_dat', DB::raw('AVG(so_tieu_thu) as avg_so_tieu_thu'))
        ->groupBy('ma_lap_dat');
        $query = QLHoaDonModel::joinSub($subQuery, 'avg_table', function ($join) {
            $join->on('ql_hoadon.ma_lap_dat', '=', 'avg_table.ma_lap_dat');
        })
        ->select('ql_hoadon.*', 'avg_table.avg_so_tieu_thu','ql_hopdong.ma_hop_dong','ql_khachhang.ten_khach_hang','ql_khachhang.ma_khach_hang','dm_loaikhachhang.ten_loai_khach_hang','dm_loaikhachhang.ma_loai_khach_hang')
        ->leftJoin('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->leftJoin('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->leftJoin('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->leftJoin('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
        ->leftJoin('dm_loaikhachhang','ql_nhomgia.ma_loai_khach_hang','=','dm_loaikhachhang.ma_loai_khach_hang')
        ->havingRaw('ql_hoadon.so_tieu_thu > 1.25 * avg_table.avg_so_tieu_thu');
        return $query->get();
    }
    public function bc_thu_doc(Request $request){
        $query=QLHoaDonModel::selectRaw('ql_hoadon.*,ql_khachhang.ma_khach_hang,ql_khachhang.ten_khach_hang,ql_hopdong.ma_hop_dong')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_lapdatdhkhach.ma_dong_ho','=','ql_donghokhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->join('dm_tuyendoc','ql_hopdong.ma_tuyen','=','dm_tuyendoc.ma_tuyen')
        ->whereRaw('ql_hoadon.khoa=0 and ql_hoadon.so_tieu_thu>0');
        if($request->has('ma_tuyen')){
            $query->where('dm_tuyendoc.ma_tuyen',$request->ma_tuyen);
        }
        if($request->has('ky_hoa_don')){
            $query->where("ql_hoadon.ky_hoa_don","like","%".$request->ky_hoa_don."%");
        }
        return $query->get();
    }
    public function kh_chua_co_hd(Request $request){
        $ds_khach_co_hd=QLKhachHangModel::selectRaw('ql_khachhang.*')
        ->leftJoin('ql_hopdong','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
        ->whereRaw('ql_hopdong.ma_hop_dong is null');
        return $ds_khach_co_hd->get();
    }
    public function dashboard(){
        $tong_khach_hang=QLKhachHangModel::selectRaw('count(ql_khachhang.ma_khach_hang) as so_khach_hang')->get();
        $tong_hop_dong=QLHopDongModel::selectRaw('count(ql_hopdong.ma_hop_dong) as so_hop_dong')->get();
        $tong_dh_khoi=QLDongHoKhoiModel::selectRaw('count(ql_donghokhoi.ma_dong_ho) as so_dh_khoi')->get();
        $tong_dh_khach=QLDongHoKhachModel::selectRaw('count(ql_donghokhach.ma_dong_ho) as so_dh_khach')->get();
        $tong_khach_hang_moi = QLKhachHangModel::selectRaw('count(ql_khachhang.ma_khach_hang) as so_khach_hang_moi')
            ->whereRaw('ql_khachhang.ngay_dang_ky BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()')
            ->get();
        $tong_khach_hang_moi_khong_hd = QLKhachHangModel::selectRaw('count(ql_khachhang.ma_khach_hang) as so_khach_hang_moi_khong_hd')
            ->leftJoin('ql_hopdong','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
            ->whereRaw('ql_hopdong.ma_hop_dong is null')
            ->whereRaw('ql_khachhang.ngay_dang_ky BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND CURDATE()')
            ->get();
        $tong_khach_hang_co_hd_chua_lap_dat = QLKhachHangModel::selectRaw('count(ql_khachhang.ma_khach_hang) as so_khach_hang_co_hd_chua_lap_dat')
            ->leftJoin('ql_hopdong','ql_hopdong.ma_khach_hang','=','ql_khachhang.ma_khach_hang')
            ->leftJoin('ql_lapdatdhkhach','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->whereRaw('ql_hopdong.ma_hop_dong is not null and ql_lapdatdhkhach.ma_lap_dat is null')
            ->get();
        return response()->json([
            $tong_khach_hang,
            $tong_hop_dong,
            $tong_dh_khoi,
            $tong_dh_khach,
            $tong_khach_hang_moi,
            $tong_khach_hang_moi_khong_hd,
            $tong_khach_hang_co_hd_chua_lap_dat,
          ]);
    }
    public function bc_kh_khu_vuc(Request $request){
        $ds_khach_khu_vuc = QLKhachHangModel::selectRaw('ql_khachhang.*, SUM(ql_hoadon.tong_cong) AS tong_cong')
            ->leftJoin('ql_hopdong', 'ql_hopdong.ma_khach_hang', '=', 'ql_khachhang.ma_khach_hang')
            ->leftJoin('ql_lapdatdhkhach', 'ql_hopdong.ma_hop_dong', '=', 'ql_lapdatdhkhach.ma_hop_dong')
            ->leftJoin('ql_hoadon', 'ql_hoadon.ma_lap_dat', '=', 'ql_lapdatdhkhach.ma_lap_dat')
            ->whereBetween('ql_khachhang.ngay_dang_ky', ['2022-01-01', $request->den_ngay])
            ->where('ma_tuyen', $request->ma_tuyen)
            ->where(function($query)use ($request) {
                $query->where('ql_hoadon.tu_ngay', '>=', $request->tu_ngay)
                    ->where('ql_hoadon.den_ngay', '<=', $request->den_ngay);
            })
            ->groupBy('ql_khachhang.ma_khach_hang');
        return $ds_khach_khu_vuc->get();
    }
}
