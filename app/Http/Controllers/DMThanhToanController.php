<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMThanhToanModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class DMThanhToanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMThanhToanModel::all();
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
            'unique' => 'Tổ quản lý đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_thuc' => 'required|unique:dm_ptthanhtoan,ten_phuong_thuc',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
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
                'message' => 'Lỗi!'
              ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return DMThanhToanModel::where("ma_phuong_thuc",$id)->first();
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
            'unique' => 'Phương thức thanh toán đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_thuc' => 'required|unique:dm_ptthanhtoan,ten_phuong_thuc',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $phuong_thuc = DMThanhToanModel::find($id); 
        if(isset($request->ten_phuong_thuc)){
            $phuong_thuc->ten_phuong_thuc=$request->ten_phuong_thuc;
        }
        $result = $phuong_thuc->save();
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
        $phuong_thuc = DMThanhToanModel::find($id);
        $result = $phuong_thuc->delete();
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
        return DMThanhToanModel::where("ten_phuong_thuc","like","%".$request->ten_phuong_thuc."%")->orderBy('ma_phuong_thuc', 'ASC')->get();
    }
}
