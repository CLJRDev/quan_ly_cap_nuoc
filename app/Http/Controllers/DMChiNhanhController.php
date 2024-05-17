<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMChiNhanhModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class DMChiNhanhController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMChiNhanhModel::all();
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
            'unique' => 'Chi nhánh đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_chi_nhanh' => 'required|unique:dm_chinhanh,ten_chi_nhanh',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $chi_nhanh = new DMChiNhanhModel; 
        $chi_nhanh->ten_chi_nhanh=$request->ten_chi_nhanh;
        $chi_nhanh->dia_chi=$request->dia_chi;
        $result = $chi_nhanh->save();
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
            return DMChiNhanhModel::where("ma_chi_nhanh",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Chi nhánh không tồn tại!'
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
            'unique' => 'Chi nhánh đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_chi_nhanh' => [
                Rule::unique('dm_chinhanh', 'ten_chi_nhanh')->ignore($id, 'ma_chi_nhanh')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $chi_nhanh = DMChiNhanhModel::findOrFail($id); 
            if(isset($request->ten_chi_nhanh)){
                $chi_nhanh->ten_chi_nhanh=$request->ten_chi_nhanh;
            }
            if(isset($request->dia_chi)){
                $chi_nhanh->dia_chi=$request->dia_chi;
            }
            $result = $chi_nhanh->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Chi nhánh không tồn tại!'
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
            $chi_nhanh = DMChiNhanhModel::findOrFail($id);
            $result = $chi_nhanh->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Chi nhánh không tồn tại!'
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
        return DMChiNhanhModel::where("ten_chi_nhanh","like","%".$request->ten_chi_nhanh."%")->orderBy('ma_chi_nhanh', 'ASC')->get();
    }
}
