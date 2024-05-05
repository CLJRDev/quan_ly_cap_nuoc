<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DMQuyenController;
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
Route::get('/phan_quyen/{mnv}/{mq}',[QLPhanQuyenController::class,'show']);
Route::delete('/phan_quyen/{mnv}/{mq}',[QLPhanQuyenController::class,'destroy']);
Route::get('/phan_quyen_search',[QLPhanQuyenController::class,'search']);
//tai khoan
Route::apiResource("tai_khoan",QLTaiKhoanController::class);
Route::get('/tai_khoan_search',[QLTaiKhoanController::class,'search']);
Route::post('/login',[QLTaiKhoanController::class,'login']);
//gia nuoc
//404
Route::fallback(function(){
    return response()->json([
        'message' => 'Trang không tồn tại'], 404);
});