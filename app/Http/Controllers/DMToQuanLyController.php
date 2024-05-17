<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMToQuanLyModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

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
        $message = [
            'required' => 'Xin hãy điền đủ thông tin!',
            'unique' => 'Tổ quản lý đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_to_quan_ly' => 'required|unique:dm_toquanly,ten_to_quan_ly',
            'ma_chi_nhanh' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
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
        try{
            return DMToQuanLyModel::select('ma_to_quan_ly','ten_to_quan_ly','dm_toquanly.ma_chi_nhanh','dm_chinhanh.ten_chi_nhanh','dm_chinhanh.dia_chi')
                ->join('dm_chinhanh','dm_chinhanh.ma_chi_nhanh','=','dm_toquanly.ma_chi_nhanh')
                ->where("ma_to_quan_ly",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Tổ quản lý không tồn tại!'
            ]);
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
            'unique' => 'Tổ quản lý đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_to_quan_ly' => [
                Rule::unique('dm_toquanly', 'ten_to_quan_ly')->ignore($id, 'ma_to_quan_ly')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        try{
            $to_quan_ly = DMToQuanLyModel::findOrFail($id); 
            if(isset($request->ten_to_quan_ly)){
                $to_quan_ly->ten_to_quan_ly=$request->ten_to_quan_ly;
            }
            if(isset($request->ma_chi_nhanh)){
                $to_quan_ly->ma_chi_nhanh=$request->ma_chi_nhanh;
            }
            $result = $to_quan_ly->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Tổ quản lý không tồn tại!'
            ]);
        }
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
        try{
            $to_quan_ly = DMToQuanLyModel::find($id);
            $result = $to_quan_ly->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Tổ quản lý không tồn tại!'
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
