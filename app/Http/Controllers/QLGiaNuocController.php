<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLGiaNuocModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  

class QLGiaNuocController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLGiaNuocModel::select('*','dm_loaikhachhang.ten_loai_khach_hang')
        ->join('dm_loaikhachhang','dm_loaikhachhang.ma_loai_khach_hang','=','ql_nhomgia.ma_loai_khach_hang')
        ->orderBy('ma_nhom_gia', 'ASC')->get();
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
            'required_if' => 'Xin hãy điền đủ thông tin!',
            'unique' => 'Cỡ đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_nhom_gia' => 'required|unique:ql_nhomgia,ten_nhom_gia',
            'gia_duoi_10m' => 'required_if:gia_rieng,NULL',
            'gia_tu_10m_den_20m' => 'required_if:gia_rieng,NULL',
            'gia_tu_20m_den_30m' => 'required_if:gia_rieng,NULL',
            'gia_tren_30m' => 'required_if:gia_rieng,NULL',
            'gia_rieng' => 'required_if:gia_duoi_10m,NULL',
            'gia_goc' => 'required',
            'ma_loai_khach_hang' => 'required|unique:ql_nhomgia,ma_loai_khach_hang',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $nhom_gia = new QLGiaNuocModel; 
        $nhom_gia->ten_nhom_gia=$request->ten_nhom_gia;
        if($request->has('gia_duoi_10m')&&$request->has('gia_tu_10m_den_20m')&&$request->has('gia_tu_20m_den_30m')&&$request->has('gia_tren_30m')){
            $nhom_gia->gia_duoi_10m=$request->gia_duoi_10m;
            $nhom_gia->gia_tu_10m_den_20m=$request->gia_tu_10m_den_20m;
            $nhom_gia->gia_tu_20m_den_30m=$request->gia_tu_20m_den_30m;
            $nhom_gia->gia_tren_30m=$request->gia_tren_30m;
        }
        else{
            $nhom_gia->gia_rieng=$request->gia_rieng;
        }
        $nhom_gia->gia_goc=$request->gia_goc;
        $nhom_gia->ma_loai_khach_hang=$request->ma_loai_khach_hang;
        $result = $nhom_gia->save();
        if($result){
            return response()->json([
                'message' => 'Tạo thành công!'
              ]);
        }
        else{
            return response()->json([
                'message' => 'Lỗi!'
              ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            return QLGiaNuocModel::where("ma_nhom_gia",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Nhóm giá không tồn tại!'
            ]);
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
            'required_if' => 'Xin hãy điền đủ thông tin!',
            'unique' => 'Cỡ đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_nhom_gia' => 'required|unique:ql_nhomgia,ten_nhom_gia',
            'gia_duoi_10m' => 'required_if:gia_rieng,NULL',
            'gia_tu_10m_den_20m' => 'required_if:gia_rieng,NULL',
            'gia_tu_20m_den_30m' => 'required_if:gia_rieng,NULL',
            'gia_tren_30m' => 'required_if:gia_rieng,NULL',
            'gia_rieng' => 'required_if:gia_duoi_10m,NULL',
            'gia_goc' => 'required',
            'ma_loai_khach_hang' => 'required|unique:ql_nhomgia,ma_loai_khach_hang',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        try{
            $nhom_gia = QLGiaNuocModel::findOrFail($id); 
            if(isset($request->ten_nhom_gia)){
                $nhom_gia->ten_nhom_gia=$request->ten_nhom_gia;
            }
            $nhom_gia->ten_nhom_gia=$request->ten_nhom_gia;
            if(isset($request->gia_duoi_10m)){
                $nhom_gia->gia_duoi_10m=$request->gia_duoi_10m;
            }
            if(isset($request->gia_tu_10m_den_20m)){
                $nhom_gia->gia_tu_10m_den_20m=$request->gia_tu_10m_den_20m;
            }
            if(isset($request->gia_tu_20m_den_30m)){
                $nhom_gia->gia_tu_20m_den_30m=$request->gia_tu_20m_den_30m;
            }
            if(isset($request->gia_tren_30m)){
                $nhom_gia->gia_tren_30m=$request->gia_tren_30m;
            }
            if(isset($request->gia_rieng)){
                $nhom_gia->gia_rieng=$request->gia_rieng;
            }
            if(isset($request->gia_goc)){
                $nhom_gia->gia_goc=$request->gia_goc;
            }
            if(isset($request->ma_loai_khach_hang)){
                $nhom_gia->ma_loai_khach_hang=$request->ma_loai_khach_hang;
            }
            $result = $nhom_gia->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Nhóm giá không tồn tại!'
            ]);
        }
        if($result){
            return response()->json([
                'message' => 'Cập nhật thành công!'
              ]);
        }
        else{
            return response()->json([
                'message' => 'Lỗi!'
              ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $nhom_gia = QLGiaNuocModel::findOrFail($id);
            $result = $nhom_gia->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Nhóm giá không tồn tại!'
            ]);
        }
        if($result){
            return response()->json([
                'message' => 'Xóa thành công!'
              ]);
        }
        else{
            return response()->json([
                'message' => 'Lỗi!'
              ]);
        }
    }
    public function search(Request $request)
    {
        $query =  QLGiaNuocModel::query()->select('*','dm_loaikhachhang.ten_loai_khach_hang')
        ->join('dm_loaikhachhang','dm_loaikhachhang.ma_loai_khach_hang','=','ql_nhomgia.ma_loai_khach_hang');
        if($request->has('ten_nhom_gia')){
            $query->where("ten_nhom_gia","like","%".$request->ten_nhom_gia."%");
        }
        if($request->has('ma_nhom_gia')){
            $query->where("ma_nhom_gia",$request->ma_nhom_gia);
        }
        if($request->has('ma_loai_khach_hang')){
            $query->where("ma_loai_khach_hang",$request->ma_loai_khach_hang);
        }
        $result = $query->orderBy('ma_nhom_gia', 'ASC')->get();
        return $result;
    }
}
