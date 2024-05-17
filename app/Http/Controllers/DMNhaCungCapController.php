<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMNhaCungCapModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class DMNhaCungCapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMNhaCungCapModel::all();
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
            'unique' => 'Nhà cung cấp đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_nha_cung_cap' => 'required|unique:dm_nhacungcap,ten_nha_cung_cap',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $nha_cung_cap = new DMNhaCungCapModel; 
        $nha_cung_cap->ten_nha_cung_cap=$request->ten_nha_cung_cap;
        $nha_cung_cap->dia_chi=$request->dia_chi;
        $nha_cung_cap->sdt=$request->sdt;
        $result = $nha_cung_cap->save();
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
            return DMNhaCungCapModel::where("ma_nha_cung_cap",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Nhà cung cấp không tồn tại!'
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
            'unique' => 'Nhà cung cấp đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_nha_cung_cap' => [
                Rule::unique('dm_nhacungcap', 'ten_nha_cung_cap')->ignore($id, 'ma_nha_cung_cap')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $nha_cung_cap = DMNhaCungCapModel::findOrFail($id); 
            if(isset($request->ten_nha_cung_cap)){
                $nha_cung_cap->ten_nha_cung_cap=$request->ten_nha_cung_cap;
            }
            if(isset($request->dia_chi)){
                $nha_cung_cap->dia_chi=$request->dia_chi;
            }
            if(isset($request->sdt)){
                $nha_cung_cap->sdt=$request->sdt;
            }
            $result = $nha_cung_cap->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Nhà cung cấp không tồn tại!'
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
            $nha_cung_cap = DMNhaCungCapModel::findOrFail($id);
            $result = $nha_cung_cap->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Nhà cung cấp không tồn tại!'
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
        return DMNhaCungCapModel::where("ten_nha_cung_cap","like","%".$request->ten_nha_cung_cap."%")->orderBy('ma_nha_cung_cap', 'ASC')->get();
    }
}
