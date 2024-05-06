<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMPhuongXaModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class DMPhuongXaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMPhuongXaModel::all();
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
            'ten_phuong_xa' => 'required|unique:dm_phuongxa,ten_phuong_xa',
            'ma_quan_huyen' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Phường xã đã tồn tại!'
                ]);
        }
        $phuong_xa = new DMPhuongXaModel; 
        $phuong_xa->ten_phuong_xa=$request->ten_phuong_xa;
        $phuong_xa->ma_quan_huyen=$request->ma_quan_huyen;
        $result = $phuong_xa->save();
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
        return DMPhuongXaModel::where("ma_phuong_xa",$id)->first();
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
            'ten_phuong_xa' => 'required',
            'ma_quan_huyen' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Xin hãy điền đủ thông tin!'
                ]);
        }
        $phuong_xa = DMPhuongXaModel::find($id); 
        if(isset($request->ten_phuong_xa)){
            $phuong_xa->ten_phuong_xa=$request->ten_phuong_xa;
        }
        if(isset($request->ma_quan_huyen)){
            $phuong_xa->ma_quan_huyen=$request->ma_quan_huyen;
        }
        $result = $phuong_xa->save();
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
        $phuong_xa = DMPhuongXaModel::find($id);
        $result = $phuong_xa->delete();
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
        $phuong_xa = DMPhuongXaModel::query();
        if($request->has('ten_phuong_xa')){
            $phuong_xa->where('ten_phuong_xa',"like","%".$request->ten_phuong_xa."%");
        }
        if($request->has('ma_quan_huyen')){
            $phuong_xa->where('ma_quan_huyen',$request->ma_quan_huyen);
        }
        return $phuong_xa->orderBy('ma_phuong_xa', 'ASC')->get();
    }
}
