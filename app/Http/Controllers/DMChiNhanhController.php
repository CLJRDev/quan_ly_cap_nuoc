<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMChiNhanhModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(),[
            'ten_chi_nhanh' => 'required|unique:dm_chinhanh,ten_chi_nhanh',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Chi nhánh đã tồn tại!'
                ]);
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
                'message' => 'Lỗi!'
              ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return DMChiNhanhModel::where("ma_chi_nhanh",$id)->first();
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
            'ten_chi_nhanh' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Xin hãy điền đủ thông tin!'
                ]);
        }
        $chi_nhanh = DMChiNhanhModel::find($id); 
        if(isset($request->ten_chi_nhanh)){
            $chi_nhanh->ten_chi_nhanh=$request->ten_chi_nhanh;
        }
        if(isset($request->dia_chi)){
            $chi_nhanh->dia_chi=$request->dia_chi;
        }
        $result = $chi_nhanh->save();
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
        $chi_nhanh = DMChiNhanhModel::find($id);
        $result = $chi_nhanh->delete();
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
        return DMChiNhanhModel::where("ten_chi_nhanh","like","%".$request->ten_chi_nhanh."%")->orderBy('ma_chi_nhanh', 'ASC')->get();
    }
}
