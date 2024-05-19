<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLHopDongModel;
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
      return QLHopDongModel::select('ql_hopdong.*','ql_hopdong.dia_chi as dia_chi_hop_dong','ql_nhomgia.*','ql_khachhang.*')
      ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
      // ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_hop_dong','=','ql_hopdong.ma_hop_dong')
      ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
      // ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
      ->orderBy('ma_hop_dong', 'ASC')->get();
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
      $hop_dong->ten_nguoi_dai_dien = $request->ten_nguoi_dai_dien;
      $hop_dong->chuc_vu_nguoi_dai_dien = $request->chuc_vu_nguoi_dai_dien;
      $hop_dong->dia_chi = $request->dia_chi;
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
          return QLHopDongModel::select('ql_hopdong.*','ql_nhomgia.*','ql_khachhang.*','ql_donghokhach.*')
          ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
          ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_hop_dong','=','ql_hopdong.ma_hop_dong')
          ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
          ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
          ->where("ma_hop_dong", $id)->firstOrFail();
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
              'required' => 'Xin hãy điền đủ thông tin!',
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
      $query = QLHopDongModel::query()->select('ql_hopdong.*','ql_nhomgia.*','ql_khachhang.*','ql_donghokhach.*')
      ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
      ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_hop_dong','=','ql_hopdong.ma_hop_dong')
      ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
      ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho');
      if ($request->has('ma_hop_dong')) {
        $query->where('ma_hop_dong', "like", "%" . $request->ma_hop_dong . "%");
      }
      if ($request->has('ten_nguoi_dai_dien')) {
        $query->where('ten_nguoi_dai_dien', "like", "%" . $request->ten_nguoi_dai_dien . "%");
      }
      if ($request->has('ma_khach_hang')) {
        $query->where('ma_khach_hang', "like", "%" . $request->ma_khach_hang . "%");
      }
      if ($request->has('ten_khach_hang')) {
        $query->where('ten_khach_hang', "like", "%" . $request->ten_khach_hang . "%");
      }
      if ($request->has('ma_dong_ho')) {
        $query->where('ma_dong_ho', "like", "%" . $request->ma_dong_ho . "%");
      }
      if ($request->has('ma_nhom_gia')) {
        $query->where('ma_nhom_gia', $request->ma_nhom_gia);
      }
      $result = $query->orderBy('ma_hop_dong', 'ASC')->get();
      return $result;
    }
    public function lookup_dh_khach(Request $request)
    {
        $query =  QLLapDatDHKhachModel::query()->select('*');
        if($request->has('ma_dong_ho')){
            $query->where(['ma_dong_ho'=>$request->ma_dong_ho,'den_ngay'=>null]);
        }
        $result = $query->orderBy('ma_lap_dat', 'DESC')->first();
        return $result;
    }
  }
  