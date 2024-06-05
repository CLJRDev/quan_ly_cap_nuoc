<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\BaoCaoController;
use App\Http\Controllers\DMChiNhanhController;
use App\Http\Controllers\DMCoDongHoController;
use App\Http\Controllers\DMLoaiDongHoController;
use App\Http\Controllers\DMLoaiKhachHangController;
use App\Http\Controllers\DMNhaCungCapController;
use App\Http\Controllers\DMPhuongXaController;
use App\Http\Controllers\DMQuanHuyenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DMQuyenController;
use App\Http\Controllers\DMThanhToanController;
use App\Http\Controllers\DMToQuanLyController;
use App\Http\Controllers\DMtuyendocController;
use App\Http\Controllers\FBController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\LSDongHoKhachController;
use App\Http\Controllers\LSDongHoKhoiController;
use App\Http\Controllers\QLDongHoKhachController;
use App\Http\Controllers\QLDongHoKhoiController;
use App\Http\Controllers\QLGiaNuocController;
use App\Http\Controllers\QLHoaDonController;
use App\Http\Controllers\QLHopDongController;
use App\Http\Controllers\QLKhachHangController;
use App\Http\Controllers\QLLapDatDHKhachController;
use App\Http\Controllers\QLLapDatDHKhoiController;
use App\Http\Controllers\QLPhanQuyenController;
use App\Http\Controllers\QLTaiKhoanController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
//quyen
Route::apiResource("quyen",DMQuyenController::class);
Route::get('/quyen_search',[DMQuyenController::class,'search']);
//phan quyen
Route::apiResource("phan_quyen",QLPhanQuyenController::class);
Route::get('/phan_quyen_search',[QLPhanQuyenController::class,'search']);
//tai khoan
Route::apiResource("tai_khoan",QLTaiKhoanController::class);
Route::get('/tai_khoan_search',[QLTaiKhoanController::class,'search']);
Route::post('/login',[QLTaiKhoanController::class,'login']);
Route::get('/logout',[QLTaiKhoanController::class,'logout']);
Route::post('/send_confirmation',[QLTaiKhoanController::class,'send_confirmation']);
Route::post('/verify_confirmation',[QLTaiKhoanController::class,'verify_confirmation']);
Route::post('/reset_password',[QLTaiKhoanController::class,'reset_password']);
//danh muc
//quan huyen
Route::apiResource("quan_huyen",DMQuanHuyenController::class);
Route::get('/quan_huyen_search',[DMQuanHuyenController::class,'search']);
//phuong xa
Route::apiResource("phuong_xa",DMPhuongXaController::class);
Route::get('/phuong_xa_search',[DMPhuongXaController::class,'search']);
//chi nhanh
Route::apiResource("chi_nhanh",DMChiNhanhController::class);
Route::get('/chi_nhanh_search',[DMChiNhanhController::class,'search']);
//to quan ly
Route::apiResource("to_quan_ly",DMToQuanLyController::class);
Route::get('/to_quan_ly_search',[DMToQuanLyController::class,'search']);
//tuyen doc
Route::apiResource("tuyen_doc",DMTuyenDocController::class);
Route::get('/tuyen_doc_search',[DMTuyenDocController::class,'search']);
//loai khach hang
Route::apiResource("loai_khach_hang",DMLoaiKhachHangController::class);
Route::get('/loai_khach_hang_search',[DMLoaiKhachHangController::class,'search']);
//phuong thuc thanh toan
Route::apiResource("pt_thanh_toan",DMThanhToanController::class);
Route::get('/pt_thanh_toan_search',[DMThanhToanController::class,'search']);
//loai dong ho
Route::apiResource("loai_dong_ho",DMLoaiDongHoController::class);
Route::get('/loai_dong_ho_search',[DMLoaiDongHoController::class,'search']);
//co dong ho
Route::apiResource("co_dong_ho",DMCoDongHoController::class);
Route::get('/co_dong_ho_search',[DMCoDongHoController::class,'search']);
//nha cung cap
Route::apiResource("nha_cung_cap",DMNhaCungCapController::class);
Route::get('/nha_cung_cap_search',[DMNhaCungCapController::class,'search']);
//gia nuoc
Route::apiResource("nhom_gia",QLGiaNuocController::class);
Route::get('/nhom_gia_search',[QLGiaNuocController::class,'search']);
//khach hang
Route::apiResource("khach_hang",QLKhachHangController::class);
Route::get('/khach_hang_search',[QLKhachHangController::class,'search']);
//hop dong
Route::apiResource("hop_dong",QLHopDongController::class);
Route::get('/hop_dong_search',[QLHopDongController::class,'search']);
Route::get('/lookup_khach_hang',[QLHopDongController::class,'lookup_khach_hang']);
//dong ho khoi
Route::apiResource("dong_ho_khoi",QLDongHoKhoiController::class);
Route::get('/dong_ho_khoi_search',[QLDongHoKhoiController::class,'search']);
//lap dat dh khoi
Route::apiResource("lap_dat_dh_khoi",QLLapDatDHKhoiController::class);
Route::get('/lap_dat_dh_khoi_search',[QLLapDatDHKhoiController::class,'search']);
Route::post('/lap_dat_dh_khoi_go',[QLLapDatDHKhoiController::class,'go_lap_dat_dh_khoi']);
Route::get('/lookup_dh_tuyen',[QLLapDatDHKhoiController::class,'lookup_dh_tuyen']);
//lich su dh khoi
Route::apiResource("lich_su_dh_khoi",LSDongHoKhoiController::class);
Route::get('/lich_su_dh_khoi_search',[LSDongHoKhoiController::class,'search']);
Route::get('/ds_ls_dhkhoi',[LSDongHoKhoiController::class,'get_list_dhkhoi']);
Route::get('/lookup_dh_khoi',[LSDongHoKhoiController::class,'lookup_dh_khoi']);
//dong ho khach hang
Route::apiResource("dong_ho_khach",QLDongHoKhachController::class);
Route::get('/dong_ho_khach_search',[QLDongHoKhachController::class,'search']);
//lap dat dh khach
Route::apiResource("lap_dat_dh_khach",QLLapDatDHKhachController::class);
Route::get('/lap_dat_dh_khach_search',[QLLapDatDHKhachController::class,'search']);
Route::post('/lap_dat_dh_khach_go',[QLLapDatDHKhachController::class,'go_lap_dat_dh_khach']);
Route::get('/lookup_dh_hop_dong',[QLLapDatDHKhachController::class,'lookup_dh_hop_dong']);
//hoa don
Route::apiResource("hoa_don",QLHoaDonController::class);
Route::get('/hoa_don_search',[QLHoaDonController::class,'search']);
Route::get('/ds_ls_dhkhach',[QLHoaDonController::class,'get_list_dhkhach']);
Route::get('/lookup_dh_khach',[QLHoaDonController::class,'lookup_dh_khach']);
Route::get('/check_tuyen',[QLHoaDonController::class,'check_tuyen']);
Route::post('/send_bill',[QLHoaDonController::class,'send_bill']);
//bao cao
Route::get('/bc_thu_tien',[BaoCaoController::class,'bc_thu_tien']);
Route::get('/bc_kh_chua_dong',[BaoCaoController::class,'bc_kh_chua_dong']);
Route::get('/bc_that_thoat',[BaoCaoController::class,'bc_that_thoat']);
Route::get('/bc_bat_thuong',[BaoCaoController::class,'bc_bat_thuong']);
Route::get('/bc_thu_doc',[BaoCaoController::class,'bc_thu_doc']);
Route::get('/kh_chua_co_hd',[BaoCaoController::class,'kh_chua_co_hd']);
Route::get('/dashboard',[BaoCaoController::class,'dashboard']);
Route::get('/bc_kh_khu_vuc',[BaoCaoController::class,'bc_kh_khu_vuc']);
//backup
Route::get('/backup', [BackupController::class, 'backup']);
//google login
Route::get('auth/google/url', [GoogleController::class, 'loginUrl']);
Route::get('auth/google/callback', [GoogleController::class, 'loginCallback']);
//fb login
Route::get('auth/facebook/url', [FBController::class, 'loginUrl']);
Route::get('auth/facebook/callback', [FBController::class, 'loginCallback']);
//404
Route::fallback(function(){
    return response()->json([
        'message' => 'Trang không tồn tại'], 404);
});
