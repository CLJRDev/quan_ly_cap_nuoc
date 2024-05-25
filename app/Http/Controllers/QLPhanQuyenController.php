<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLPhanQuyenModel;
use App\Models\QLTaiKhoanModel;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use \Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class QLPhanQuyenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLPhanQuyenModel::select('ma_phan_quyen','ql_phanquyen.ma_quyen','dm_quyen.ten_quyen','ql_phanquyen.ma_nhan_vien','ql_taikhoan.ho_ten','ql_taikhoan.chuc_vu','dm_tuyendoc.*')
        ->join('dm_quyen','dm_quyen.ma_quyen','=','ql_phanquyen.ma_quyen')
        ->join('ql_taikhoan','ql_taikhoan.ma_nhan_vien','=','ql_phanquyen.ma_nhan_vien')
        ->leftJoin('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_phanquyen.ma_tuyen')
        ->where('dm_quyen.trang_thai',1)
        ->where('ql_taikhoan.trang_thai',1)
        ->orderBy('ma_nhan_vien', 'ASC')->get();
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
            'unique' => 'Phân quyền đã tồn tại!',
        ];
        foreach($request->ma_quyen as $quyen){
            $validator = Validator::make($request->all(),[
                'ma_nhan_vien' => 'required|unique:ql_phanquyen,ma_nhan_vien,NULL,ma_phan_quyen,ma_quyen,' . $quyen,
                'ma_quyen' => 'required',
              ],$message);
            
            if($validator->fails()){
                return response()->json([
                    'error' => $validator->errors(),
                    ],422);
            }
        }
        foreach($request->ma_quyen as $quyen ){
            $phan_quyen = new QLPhanQuyenModel; 
            $phan_quyen->ma_nhan_vien=$request->ma_nhan_vien;
            $phan_quyen->ma_quyen=$quyen;
            $phan_quyen->ma_tuyen=$request->ma_tuyen;
            $result = $phan_quyen->save();
            if(!$result){
                return response()->json([
                    'error' => 'Lỗi!'
                  ],422);
            }
        }

        if($result){
            return response()->json([
                'message' => 'Tạo thành công!'
              ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $phan_quyen = QLPhanQuyenModel::select('ma_phan_quyen','ql_phanquyen.ma_quyen','dm_quyen.ten_quyen','ql_phanquyen.ma_nhan_vien','ql_taikhoan.ho_ten','ql_taikhoan.chuc_vu')
            ->join('dm_quyen','dm_quyen.ma_quyen','=','ql_phanquyen.ma_quyen')
            ->join('ql_taikhoan','ql_taikhoan.ma_nhan_vien','=','ql_phanquyen.ma_nhan_vien')
            ->where('dm_quyen.trang_thai',1)
            ->where('ql_taikhoan.trang_thai',1)
            ->findOrFail($id);
            return $phan_quyen;
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phân quyền không tồn tại!'
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
            'unique' => 'Phân quyền đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ma_quyen' => 'unique:ql_phanquyen,ma_quyen,NULL,ma_phan_quyen,ma_nhan_vien,' . $request->ma_nhan_vien,
            ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $phan_quyen = QLPhanQuyenModel::findOrFail($id); 
            if(isset($request->ma_quyen)){
                $phan_quyen->ma_quyen=$request->ma_quyen;
            }
            if(isset($request->ma_tuyen)){
                    $phan_quyen->ma_tuyen=$request->ma_tuyen;
            }
            $result = $phan_quyen->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phân quyền không tồn tại!'
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
            $phan_quyen = QLPhanQuyenModel::findOrFail($id);
            $result = $phan_quyen->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phân quyền không tồn tại!'
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
        $query = QLPhanQuyenModel::query()->select('ma_phan_quyen','ql_phanquyen.ma_quyen','dm_quyen.ten_quyen','ql_phanquyen.ma_nhan_vien','ql_taikhoan.ho_ten','ql_taikhoan.chuc_vu')
            ->join('dm_quyen','dm_quyen.ma_quyen','=','ql_phanquyen.ma_quyen')
            ->join('ql_taikhoan','ql_taikhoan.ma_nhan_vien','=','ql_phanquyen.ma_nhan_vien')
            ->leftJoin('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_phanquyen.ma_tuyen');
        if($request->has('ma_nhan_vien')){
            $query->where('ql_phanquyen.ma_nhan_vien',"like","%".$request->ma_nhan_vien."%");
        }
        if($request->has('ten_quyen')){
            $query->where('dm_quyen.ten_quyen',"like","%".$request->ten_quyen."%");
        }
        if($request->has('ho_ten')){
            $query->where('ql_taikhoan.ho_ten',"like","%".$request->ho_ten."%");
        }
        if($request->has('ma_quyen')){
            $query->where('ql_phanquyen.ma_quyen',$request->ma_quyen);
        }
        if($request->has('kich_hoat')&&$request->kich_hoat==0){
            $query->where('dm_quyen.trang_thai',1)
            ->where('ql_taikhoan.trang_thai',1);
        }
        if($request->has('ma_tuyen')){
            $query->where('ma_tuyen',$request->ma_tuyen);
        }
        $result = $query->orderBy('ql_phanquyen.ma_nhan_vien', 'ASC')->get();
        return $result;
    }
}
