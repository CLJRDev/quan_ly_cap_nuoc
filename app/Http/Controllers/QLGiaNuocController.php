<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLGiaNuocModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;

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
            'unique' => 'Nhóm giá đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_nhom_gia' => 'required|unique:ql_nhomgia,ten_nhom_gia',
            'hs_duoi_10m' => 'required_if:hs_rieng,NULL',
            'hs_tu_10m_den_20m' => 'required_if:hs_rieng,NULL',
            'hs_tu_20m_den_30m' => 'required_if:hs_rieng,NULL',
            'hs_tren_30m' => 'required_if:hs_rieng,NULL',
            'hs_rieng' => 'required_if:hs_duoi_10m,NULL',
            'hs_thue' => 'required',
            'gia_ban' => 'required',
            'ma_loai_khach_hang' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $nhom_gia = new QLGiaNuocModel; 
        $nhom_gia->ten_nhom_gia=$request->ten_nhom_gia;
        if($request->has('hs_duoi_10m')&&$request->has('hs_tu_10m_den_20m')&&$request->has('hs_tu_20m_den_30m')&&$request->has('hs_tren_30m')){
            $nhom_gia->hs_duoi_10m=$request->hs_duoi_10m;
            $nhom_gia->hs_tu_10m_den_20m=$request->hs_tu_10m_den_20m;
            $nhom_gia->hs_tu_20m_den_30m=$request->hs_tu_20m_den_30m;
            $nhom_gia->hs_tren_30m=$request->hs_tren_30m;
        }
        else{
            $nhom_gia->hs_rieng=$request->hs_rieng;
        }
        $nhom_gia->hs_thue=$request->hs_thue;
        $nhom_gia->gia_ban=$request->gia_ban;
        $nhom_gia->ma_loai_khach_hang=$request->ma_loai_khach_hang;
        $result = $nhom_gia->save();
        if($result){
            return response()->json([
                'message' => 'Tạo thành công!'
              ]);
        }
        else{
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
            return QLGiaNuocModel::select('*', 'dm_loaikhachhang.ten_loai_khach_hang')
            ->join('dm_loaikhachhang', 'dm_loaikhachhang.ma_loai_khach_hang', '=', 'ql_nhomgia.ma_loai_khach_hang')
            ->where("ma_nhom_gia",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Nhóm giá không tồn tại!'
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
            'required_if' => 'Xin hãy điền đủ thông tin!',
            'unique' => 'Nhóm giá đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_nhom_gia' => [
                Rule::unique('ql_nhomgia', 'ten_nhom_gia')->ignore($id, 'ma_nhom_gia')
              ],
            'hs_duoi_10m' => 'required_if:hs_rieng,NULL',
            'hs_tu_10m_den_20m' => 'required_if:hs_rieng,NULL',
            'hs_tu_20m_den_30m' => 'required_if:hs_rieng,NULL',
            'hs_tren_30m' => 'required_if:hs_rieng,NULL',
            'hs_rieng' => 'required_if:hs_duoi_10m,NULL',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $nhom_gia = QLGiaNuocModel::findOrFail($id); 
            if(isset($request->ten_nhom_gia)){
                $nhom_gia->ten_nhom_gia=$request->ten_nhom_gia;
            }
            if(isset($request->hs_duoi_10m)){
                $nhom_gia->hs_duoi_10m=$request->hs_duoi_10m;
                $nhom_gia->hs_rieng=null;
            }
            if(isset($request->hs_tu_10m_den_20m)){
                $nhom_gia->hs_tu_10m_den_20m=$request->hs_tu_10m_den_20m;
                $nhom_gia->hs_rieng=null;
            }
            if(isset($request->hs_tu_20m_den_30m)){
                $nhom_gia->hs_tu_20m_den_30m=$request->hs_tu_20m_den_30m;
                $nhom_gia->hs_rieng=null;
            }
            if(isset($request->hs_tren_30m)){
                $nhom_gia->hs_tren_30m=$request->hs_tren_30m;
                $nhom_gia->hs_rieng=null;
            }
            if(isset($request->hs_rieng)){
                $nhom_gia->hs_rieng=$request->hs_rieng;
                $nhom_gia->hs_duoi_10m=null;
                $nhom_gia->hs_tu_10m_den_20m=null;
                $nhom_gia->hs_tu_20m_den_30m=null;
                $nhom_gia->hs_tren_30m=null;
            }
            if(isset($request->hs_thue)){
                $nhom_gia->hs_thue=$request->hs_thue;
            }
            if(isset($request->gia_ban)){
                $nhom_gia->gia_ban=$request->gia_ban;
            }
            if(isset($request->ma_loai_khach_hang)){
                $nhom_gia->ma_loai_khach_hang=$request->ma_loai_khach_hang;
            }
            $result = $nhom_gia->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Nhóm giá không tồn tại!'
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
            $nhom_gia = QLGiaNuocModel::findOrFail($id);
            $result = $nhom_gia->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Nhóm giá không tồn tại!'
            ],422);
        }
        if($result){
            return response()->json([
                'message' => 'Xóa thành công!'
              ]);
        }
        else{
            return response()->json([
                'error' => 'Lỗi!'
              ],422);
        }
    }
    public function search(Request $request)
    {
        $query =  QLGiaNuocModel::query()->select('*','dm_loaikhachhang.ten_loai_khach_hang')
        ->join('dm_loaikhachhang','dm_loaikhachhang.ma_loai_khach_hang','=','ql_nhomgia.ma_loai_khach_hang');
        if($request->has('ten_nhom_gia')){
            $query->where("ten_nhom_gia","like","%".$request->ten_nhom_gia."%");
        }
        if ($request->has('ma_loai_khach_hang')) {
            $query->where("dm_loaikhachhang.ma_loai_khach_hang", $request->ma_loai_khach_hang);
        }
        $result = $query->orderBy('ma_nhom_gia', 'ASC')->get();
        return $result;
    }
}
