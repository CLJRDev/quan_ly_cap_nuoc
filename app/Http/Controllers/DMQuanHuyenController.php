<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMQuanHuyenModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class DMQuanHuyenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMQuanHuyenModel::orderBy('ma_quan_huyen')->get();
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
                'error' => $validator->errors(),
                ],422);
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
            return DMQuanHuyenModel::where("ma_quan_huyen",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Quận huyện không tồn tại!'
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
            'unique' => 'Quận huyện đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_quan_huyen' => [
                Rule::unique('dm_quanhuyen', 'ten_quan_huyen')->ignore($id, 'ma_quan_huyen')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $quan_huyen = DMQuanHuyenModel::findOrFail($id); 
            if(isset($request->ten_quan_huyen)){
                $quan_huyen->ten_quan_huyen=$request->ten_quan_huyen;
            }
            $result = $quan_huyen->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Quận huyện không tồn tại!'
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
            $quan_huyen = DMQuanHuyenModel::findOrFail($id);
            $result = $quan_huyen->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Quận huyện không tồn tại!'
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
        return DMQuanHuyenModel::where("ten_quan_huyen","like","%".$request->ten_quan_huyen."%")->orderBy('ma_quan_huyen', 'ASC')->get();
    }
}
