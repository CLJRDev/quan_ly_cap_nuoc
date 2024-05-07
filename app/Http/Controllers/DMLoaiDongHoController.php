<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMLoaiDongHoModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class DMLoaiDongHoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMLoaiDongHoModel::all();
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
            'unique' => 'Loại đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_loai_dong_ho' => 'required|unique:dm_loaidongho,ten_loai_dong_ho',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $loai_dong_ho = new DMLoaiDongHoModel; 
        $loai_dong_ho->ten_loai_dong_ho=$request->ten_loai_dong_ho;
        $result = $loai_dong_ho->save();
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
        return DMLoaiDongHoModel::where("ma_loai_dong_ho",$id)->first();
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
            'unique' => 'Loại đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_loai_dong_ho' => 'required|unique:dm_loaidongho,ten_loai_dong_ho',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $loai_dong_ho = DMLoaiDongHoModel::find($id); 
        if(isset($request->ten_loai_dong_ho)){
            $loai_dong_ho->ten_loai_dong_ho=$request->ten_loai_dong_ho;
        }
        $result = $loai_dong_ho->save();
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
        $loai_dong_ho = DMLoaiDongHoModel::find($id);
        $result = $loai_dong_ho->delete();
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
        return DMLoaiDongHoModel::where("ten_loai_dong_ho","like","%".$request->ten_loai_dong_ho."%")->orderBy('ma_loai_dong_ho', 'ASC')->get();
    }
}
