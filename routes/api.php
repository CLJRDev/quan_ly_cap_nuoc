<?php

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
use App\Http\Controllers\QLGiaNuocController;
use App\Http\Controllers\QLKhachHangController;
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
//404
Route::fallback(function(){
    return response()->json([
        'message' => 'Trang không tồn tại'], 404);
});