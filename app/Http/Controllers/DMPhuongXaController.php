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
        return DMPhuongXaModel::select('ma_phuong_xa','ten_phuong_xa','dm_phuongxa.ma_quan_huyen','dm_quanhuyen.ten_quan_huyen')
        ->join('dm_quanhuyen','dm_quanhuyen.ma_quan_huyen','=','dm_phuongxa.ma_quan_huyen')
        ->orderBy('ma_phuong_xa', 'ASC')->get();
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
            'unique' => 'Phường xã đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_xa' => 'required|unique:dm_phuongxa,ten_phuong_xa',
            'ma_quan_huyen' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
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
        return DMPhuongXaModel::select('ma_phuong_xa','ten_phuong_xa','dm_phuongxa.ma_quan_huyen','dm_quanhuyen.ten_quan_huyen')
        ->join('dm_quanhuyen','dm_quanhuyen.ma_quan_huyen','=','dm_phuongxa.ma_quan_huyen')
        ->where("ma_phuong_xa",$id)->first();
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
            'unique' => 'Phường xã đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_xa' => 'required|unique:dm_phuongxa,ten_phuong_xa',
            'ma_quan_huyen' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
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
        $phuong_xa = DMPhuongXaModel::query()->select('ma_phuong_xa','ten_phuong_xa','dm_phuongxa.ma_quan_huyen','dm_quanhuyen.ten_quan_huyen')
        ->join('dm_quanhuyen','dm_quanhuyen.ma_quan_huyen','=','dm_phuongxa.ma_quan_huyen');
        if($request->has('ten_phuong_xa')){
            $phuong_xa->where('ten_phuong_xa',"like","%".$request->ten_phuong_xa."%");
        }
        if($request->has('ma_quan_huyen')){
            $phuong_xa->where('ma_quan_huyen',$request->ma_quan_huyen);
        }
        return $phuong_xa->orderBy('ma_phuong_xa', 'ASC')->get();
    }
}
