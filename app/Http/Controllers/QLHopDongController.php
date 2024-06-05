<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLHopDongModel;
use App\Models\QLKhachHangModel;
use App\Models\QLLapDatDHKhachModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  

class QLHopDongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return QLHopDongModel::select('ql_hopdong.*','ql_hopdong.dia_chi as dia_chi_hop_dong','ql_nhomgia.ten_nhom_gia','ql_khachhang.*', 'dm_tuyendoc.ten_tuyen')
      ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
      ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
      ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
      ->orderBy('ma_hop_dong', 'DESC')->get();
    }
  
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      //
    }
  
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $message = [
        'required' => 'Xin hãy điền đủ thông tin!',
        'date' => 'Ngày lắp không hợp lệ!'
      ];
      $validator = Validator::make($request->all(), [
        'ten_nguoi_dai_dien' => 'required',
        'dia_chi' => 'required',
        'ngay_lap' => 'required|date',
        'ma_khach_hang' => 'required',
        'chuc_vu_nguoi_dai_dien' => 'required',
        'ma_tuyen' => 'required',
        'ma_nhom_gia' => 'required',
      ], $message);
  
      if ($validator->fails()) {
        return response()->json([
          'error' => $validator->errors(),
        ],422);
      }
      $hop_dong = new QLHopDongModel;
      $khach_hang = QLKhachHangModel::where('ma_khach_hang',$request->ma_khach_hang)->first();
      $hop_dong->ten_nguoi_dai_dien = $request->ten_nguoi_dai_dien;
      $hop_dong->chuc_vu_nguoi_dai_dien = $request->chuc_vu_nguoi_dai_dien;
      $hop_dong->dia_chi = $request->dia_chi;
      $hop_dong->trang_thai = 0;
      $hop_dong->ngay_lap = $request->ngay_lap;
      $hop_dong->ma_khach_hang = $request->ma_khach_hang;
      $hop_dong->ma_tuyen = $request->ma_tuyen;
      $hop_dong->ma_nhom_gia  = $request->ma_nhom_gia ;
      $result = $hop_dong->save();
      if ($result) {
        return response()->json([
          'message' => 'Tạo thành công!'
        ]);
      } else {
        return response()->json([
          'error' => 'Lỗi!'
        ],422);
      }
    }
  
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
      try{
          return QLHopDongModel::select('ql_hopdong.*','ql_hopdong.dia_chi as dia_chi_hop_dong','ql_nhomgia.ten_nhom_gia','ql_khachhang.*', 'dm_tuyendoc.ten_tuyen')
          ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
          ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
          ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
          ->where("ql_hopdong.ma_hop_dong", $id)->firstOrFail();
      }catch (ModelNotFoundException $e) {
          return response()->json([
             'error' => 'Hợp đồng không tồn tại!'
          ],422);
      }
    }
  
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
      //
    }
  
      /**
       * Update the specified resource in storage.
       */
      public function update(Request $request, string $id)
      {
          $message = [
              'date' => 'Ngày lắp không hợp lệ!'
          ];
          $validator = Validator::make($request->all(),[
            'ngay_lap' => 'date',
            ],$message);
          if($validator->fails()){
              return response()->json([
                  'error' => $validator->errors(),
                  ],422);
          }
          try{
              $hop_dong = QLHopDongModel::findOrFail($id); 
              if(isset($request->ten_nguoi_dai_dien)){
                  $hop_dong->ten_nguoi_dai_dien=$request->ten_nguoi_dai_dien;
              }
              if(isset($request->chuc_vu_nguoi_dai_dien)){
                  $hop_dong->chuc_vu_nguoi_dai_dien=$request->chuc_vu_nguoi_dai_dien;
              }
              if(isset($request->dia_chi)){
                  $hop_dong->dia_chi=$request->dia_chi;
              }
              if(isset($request->ngay_lap)){
                  $hop_dong->ngay_lap=$request->ngay_lap;
              }
              if(isset($request->ma_khach_hang)){
                $hop_dong->ma_khach_hang=$request->ma_khach_hang;
            }
            if(isset($request->ma_tuyen)){
                $hop_dong->ma_tuyen=$request->ma_tuyen;
            }
            if(isset($request->ma_nhom_gia)){
                $hop_dong->ma_nhom_gia=$request->ma_nhom_gia;
            }
              $result = $hop_dong->save();
          }catch (ModelNotFoundException $e) {
              return response()->json([
                 'error' => 'Hợp đồng không tồn tại!'
              ],422);
          }
          
          if($result){
              return response()->json([
                  'message' => 'Cập nhật thành công!'
                ]);
          }
          else{
              return response()->json([
                  'error' => 'Lỗi!'
                ],422);
          }
      }
  
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
      try{
          $hop_dong = QLHopDongModel::findOrFail($id);
          $result = $hop_dong->delete();
      }catch (ModelNotFoundException $e) {
          return response()->json([
             'error' => 'Hợp đồng không tồn tại!'
          ],422);
      }
      
      if ($result) {
        return response()->json([
          'message' => 'Xóa thành công!'
        ]);
      } else {
        return response()->json([
          'error' => 'Lỗi!'
        ],422);
      }
    }
    public function search(Request $request)
    {
      $query = QLHopDongModel::query()->select('ql_hopdong.*','ql_hopdong.dia_chi as dia_chi_hop_dong','ql_nhomgia.ten_nhom_gia','ql_khachhang.*', 'dm_tuyendoc.ten_tuyen')
      ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
      ->join('dm_tuyendoc', 'dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
      ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang');
      if ($request->has('ma_hop_dong')) {
        $query->where('ma_hop_dong', "like", "%" . $request->ma_hop_dong . "%");
      }
      if ($request->has('ten_nguoi_dai_dien')) {
        $query->where('ten_nguoi_dai_dien', "like", "%" . $request->ten_nguoi_dai_dien . "%");
      }
      if ($request->has('ma_khach_hang')) {
        $query->where('ql_hopdong.ma_khach_hang', $request->ma_khach_hang);
      }
      if ($request->has('ten_khach_hang')) {
        $query->where('ten_khach_hang', "like", "%" . $request->ten_khach_hang . "%");
      }
      if ($request->has('ma_dong_ho')) {
        $query->where('ma_dong_ho', "like", "%" . $request->ma_dong_ho . "%");
      }
      if ($request->has('ma_nhom_gia')) {
        $query->where('ql_hopdong.ma_nhom_gia', $request->ma_nhom_gia);
      }
      if ($request->has('dia_chi')) {
        $query->where('ql_hopdong.dia_chi', "like", "%" . $request->dia_chi . "%");
      }
      if ($request->has('trang_thai')) {
        $query->where('ql_hopdong.trang_thai',$request->trang_thai);
      }
      if ($request->has('ngay_lap')) {
        $query->where('ql_hopdong.ngay_lap',$request->ngay_lap);
      }
      $result = $query->orderBy('ma_hop_dong', 'ASC')->get();
      return $result;
    }
    public function lookup_khach_hang(Request $request)
    {
      try{
          return QLKhachHangModel::where("can_cuoc", $request->can_cuoc)->firstOrFail();
      }catch (ModelNotFoundException $e) {
          return response()->json([
            'error' => 'Khách hàng không tồn tại!'
          ],422);
      }
    }
  }
  
