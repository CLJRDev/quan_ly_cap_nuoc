<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMLoaiKhachHangModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class DMLoaiKhachHangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMLoaiKhachHangModel::orderBy('ma_loai_khach_hang','ASC')->get();
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
            'unique' => 'Loại khách hàng đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_loai_khach_hang' => 'required|unique:dm_loaikhachhang,ten_loai_khach_hang',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $loai_khach_hang = new DMLoaiKhachHangModel; 
        $loai_khach_hang->ten_loai_khach_hang=$request->ten_loai_khach_hang;
        $result = $loai_khach_hang->save();
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
            return DMLoaiKhachHangModel::where("ma_loai_khach_hang",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Loại khách hàng không tồn tại!'
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
            'unique' => 'Loại khách hàng đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_loai_khach_hang' => [
                Rule::unique('dm_loaikhachhang', 'ten_loai_khach_hang')->ignore($id, 'ma_loai_khach_hang')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $loai_khach_hang = DMLoaiKhachHangModel::find($id); 
        if(isset($request->ten_loai_khach_hang)){
            $loai_khach_hang->ten_loai_khach_hang=$request->ten_loai_khach_hang;
        }
        $result = $loai_khach_hang->save();
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
        $loai_khach_hang = DMLoaiKhachHangModel::find($id);
        $result = $loai_khach_hang->delete();
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
        return DMLoaiKhachHangModel::where("ten_loai_khach_hang","like","%".$request->ten_loai_khach_hang."%")->orderBy('ma_loai_khach_hang', 'ASC')->get();
    }
}
