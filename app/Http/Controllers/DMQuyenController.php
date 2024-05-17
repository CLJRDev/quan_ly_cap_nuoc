<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMQuyenModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

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
        $message = [
            'required' => 'Xin hãy điền đủ thông tin!',
            'unique' => 'Quyền đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_quyen' => 'required|unique:dm_quyen,ten_quyen',
            'trang_thai' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $quyen = new DMQuyenModel; 
        $quyen->ten_quyen=$request->ten_quyen;
        $quyen->trang_thai=$request->trang_thai;
        $result = $quyen->save();
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
            return DMQuyenModel::where("ma_quyen",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Quyền không tồn tại!'
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
            'unique' => 'Quyền đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_quyen' => [
              Rule::unique('dm_quyen', 'ten_quyen')->ignore($id, 'ma_quyen')
            ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $quyen = DMQuyenModel::findOrFail($id); 
            if(isset($request->ten_quyen)){
                $quyen->ten_quyen=$request->ten_quyen;
            }
            if(isset($request->trang_thai)){
                $quyen->trang_thai=$request->trang_thai;
            }
            $result = $quyen->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Quyền không tồn tại!'
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
            $quyen = DMQuyenModel::findOrFail($id);
            $result = $quyen->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Quyền không tồn tại!'
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
        $query =  DMQuyenModel::query();
        if($request->has('ten_quyen')){
            $query->where("ten_quyen","like","%".$request->ten_quyen."%");
        }
        if($request->has('trang_thai')){
            $query->where("trang_thai",$request->trang_thai);
        }
        $result = $query->orderBy('ma_quyen', 'ASC')->get();
    }
}
