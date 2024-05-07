<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMQuanHuyenModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class DMQuanHuyenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMQuanHuyenModel::all();
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
            'unique' => 'Quận huyện đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_quan_huyen' => 'required|unique:dm_quanhuyen,ten_quan_huyen',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $quan_huyen = new DMQuanHuyenModel; 
        $quan_huyen->ten_quan_huyen=$request->ten_quan_huyen;
        $result = $quan_huyen->save();
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
        return DMQuanHuyenModel::where("ma_quan_huyen",$id)->first();
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
            'unique' => 'Quận huyện đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_quan_huyen' => 'required|unique:dm_quanhuyen,ten_quan_huyen',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $quan_huyen = DMQuanHuyenModel::find($id); 
        if(isset($request->ten_quan_huyen)){
            $quan_huyen->ten_quan_huyen=$request->ten_quan_huyen;
        }
        $result = $quan_huyen->save();
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
        $quan_huyen = DMQuanHuyenModel::find($id);
        $result = $quan_huyen->delete();
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
        return DMQuanHuyenModel::where("ten_quan_huyen","like","%".$request->ten_quan_huyen."%")->orderBy('ma_quan_huyen', 'ASC')->get();
    }
}
