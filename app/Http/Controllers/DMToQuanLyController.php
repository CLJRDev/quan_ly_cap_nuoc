<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMToQuanLyModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class DMToQuanLyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMToQuanLyModel::select('ma_to_quan_ly','ten_to_quan_ly','dm_toquanly.ma_chi_nhanh','dm_chinhanh.ten_chi_nhanh','dm_chinhanh.dia_chi')
        ->join('dm_chinhanh','dm_chinhanh.ma_chi_nhanh','=','dm_toquanly.ma_chi_nhanh')
        ->orderBy('ma_to_quan_ly', 'ASC')->get();
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
            'ten_to_quan_ly' => 'required|unique:dm_toquanly,ten_to_quan_ly',
            'ma_chi_nhanh' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Tổ quản lý đã tồn tại!'
                ]);
        }
        $to_quan_ly = new DMToQuanLyModel; 
        $to_quan_ly->ten_to_quan_ly=$request->ten_to_quan_ly;
        $to_quan_ly->ma_chi_nhanh=$request->ma_chi_nhanh;
        $result = $to_quan_ly->save();
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
        return DMToQuanLyModel::select('ma_to_quan_ly','ten_to_quan_ly','dm_toquanly.ma_chi_nhanh','dm_chinhanh.ten_chi_nhanh','dm_chinhanh.dia_chi')
        ->join('dm_chinhanh','dm_chinhanh.ma_chi_nhanh','=','dm_toquanly.ma_chi_nhanh')
        ->where("ma_to_quan_ly",$id)->first();
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
            'ten_to_quan_ly' => 'required',
            'ma_chi_nhanh' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Xin hãy điền đủ thông tin!'
                ]);
        }
        $to_quan_ly = DMToQuanLyModel::find($id); 
        if(isset($request->ten_to_quan_ly)){
            $to_quan_ly->ten_to_quan_ly=$request->ten_to_quan_ly;
        }
        if(isset($request->ma_chi_nhanh)){
            $to_quan_ly->ma_chi_nhanh=$request->ma_chi_nhanh;
        }
        $result = $to_quan_ly->save();
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
        $to_quan_ly = DMToQuanLyModel::find($id);
        $result = $to_quan_ly->delete();
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
        $to_quan_ly = DMToQuanLyModel::query()->select('ma_to_quan_ly','ten_to_quan_ly','dm_toquanly.ma_chi_nhanh','dm_chinhanh.ten_chi_nhanh','dm_chinhanh.dia_chi')
        ->join('dm_chinhanh','dm_chinhanh.ma_chi_nhanh','=','dm_toquanly.ma_chi_nhanh');
        if($request->has('ten_to_quan_ly')){
            $to_quan_ly->where('ten_to_quan_ly',"like","%".$request->ten_to_quan_ly."%");
        }
        if($request->has('ma_chi_nhanh')){
            $to_quan_ly->where('ma_chi_nhanh',$request->ma_chi_nhanh);
        }
        return $to_quan_ly->orderBy('ma_to_quan_ly', 'ASC')->get();
    }
}
