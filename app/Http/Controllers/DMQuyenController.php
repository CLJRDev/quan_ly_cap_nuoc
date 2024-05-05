<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMQuyenModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class DMQuyenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMQuyenModel::orderBy('ma_quyen', 'ASC')->get();
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
        $validator = Validator::make($request->all(),[
            'ten_quyen' => 'required|unique:dm_quyen,ten_quyen',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Quyền đã tồn tại!'
                ]);
        }
        $quyen = new DMQuyenModel; 
        $quyen->ten_quyen=$request->ten_quyen;
        $result = $quyen->save();
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
        return DMQuyenModel::where("ma_quyen",$id)->first();
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
        $validator = Validator::make($request->all(),[
            'ten_quyen' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Xin hãy điền đủ thông tin!'
                ]);
        }
        $quyen = DMQuyenModel::find($id); 
        if(isset($request->ten_quyen)){
            $quyen->ten_quyen=$request->ten_quyen;
        }
        $result = $quyen->save();
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
        $quyen = DMQuyenModel::find($id);
        $result = $quyen->delete();
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
    public function search(string $id)
    {
        return DMQuyenModel::where("ten_quyen","like","%".$id."%")->orderBy('ma_quyen', 'ASC')->get();
    }
}
