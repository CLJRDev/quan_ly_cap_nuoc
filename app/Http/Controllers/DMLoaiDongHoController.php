<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMLoaiDongHoModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

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
                'error' => $validator->errors(),
                ],422);
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
            return DMLoaiDongHoModel::where("ma_loai_dong_ho",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Loại đồng hồ không tồn tại!'
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
            'unique' => 'Loại đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_loai_dong_ho' => [
                Rule::unique('dm_loaidongho', 'ten_loai_dong_ho')->ignore($id, 'ma_loai_dong_ho')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $loai_dong_ho = DMLoaiDongHoModel::findOrFail($id); 
            if(isset($request->ten_loai_dong_ho)){
                $loai_dong_ho->ten_loai_dong_ho=$request->ten_loai_dong_ho;
            }
            $result = $loai_dong_ho->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Loại đồng hồ không tồn tại!'
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
            $loai_dong_ho = DMLoaiDongHoModel::findOrFail($id);
            $result = $loai_dong_ho->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Loại đồng hồ không tồn tại!'
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
        return DMLoaiDongHoModel::where("ten_loai_dong_ho","like","%".$request->ten_loai_dong_ho."%")->orderBy('ma_loai_dong_ho', 'ASC')->get();
    }
}
