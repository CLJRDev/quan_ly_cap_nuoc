<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMThanhToanModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class DMThanhToanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMThanhToanModel::orderBy('ma_phuong_thuc','ASC')->get();
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
            'unique' => 'Phương thức thanh toán đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_thuc' => 'required|unique:dm_ptthanhtoan,ten_phuong_thuc',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $phuong_thuc = new DMThanhToanModel; 
        $phuong_thuc->ten_phuong_thuc=$request->ten_phuong_thuc;
        $result = $phuong_thuc->save();
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
            return DMThanhToanModel::where("ma_phuong_thuc",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phương thức thanh toán không tồn tại!'
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
            'unique' => 'Phương thức thanh toán đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_thuc' => [
                Rule::unique('dm_ptthanhtoan', 'ten_phuong_thuc')->ignore($id, 'ma_phuong_thuc')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $phuong_thuc = DMThanhToanModel::findOrFail($id); 
            if(isset($request->ten_phuong_thuc)){
                $phuong_thuc->ten_phuong_thuc=$request->ten_phuong_thuc;
            }
            $result = $phuong_thuc->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phương thức thanh toán không tồn tại!'
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
            $phuong_thuc = DMThanhToanModel::findOrFail($id);
            $result = $phuong_thuc->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phương thức thanh toán không tồn tại!'
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
        return DMThanhToanModel::where("ten_phuong_thuc","like","%".$request->ten_phuong_thuc."%")->orderBy('ma_phuong_thuc', 'ASC')->get();
    }
}
