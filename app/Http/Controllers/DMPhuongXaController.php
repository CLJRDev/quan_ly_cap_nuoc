<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMPhuongXaModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

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
                'error' => $validator->errors(),
                ],422);
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
            return DMPhuongXaModel::select('ma_phuong_xa','ten_phuong_xa','dm_phuongxa.ma_quan_huyen','dm_quanhuyen.ten_quan_huyen')
            ->join('dm_quanhuyen','dm_quanhuyen.ma_quan_huyen','=','dm_phuongxa.ma_quan_huyen')
            ->where("ma_phuong_xa",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phường xã không tồn tại!'
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
            'unique' => 'Phường xã đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_phuong_xa' => [
                Rule::unique('dm_phuongxa', 'ten_phuong_xa')->ignore($id, 'ma_phuong_xa')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $phuong_xa = DMPhuongXaModel::findOrFail($id); 
            if(isset($request->ten_phuong_xa)){
                $phuong_xa->ten_phuong_xa=$request->ten_phuong_xa;
            }
            if(isset($request->ma_quan_huyen)){
                $phuong_xa->ma_quan_huyen=$request->ma_quan_huyen;
            }
            $result = $phuong_xa->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phường xã không tồn tại!'
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
            $phuong_xa = DMPhuongXaModel::findOrFail($id);
            $result = $phuong_xa->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Phường xã không tồn tại!'
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
        $phuong_xa = DMPhuongXaModel::query()->select('ma_phuong_xa','ten_phuong_xa','dm_phuongxa.ma_quan_huyen','dm_quanhuyen.ten_quan_huyen')
        ->join('dm_quanhuyen','dm_quanhuyen.ma_quan_huyen','=','dm_phuongxa.ma_quan_huyen');
        if($request->has('ten_phuong_xa')){
            $phuong_xa->where('ten_phuong_xa',"like","%".$request->ten_phuong_xa."%");
        }
        if($request->has('ma_quan_huyen')){
            $phuong_xa->where('dm_phuongxa.ma_quan_huyen',$request->ma_quan_huyen);
        }
        return $phuong_xa->orderBy('ma_phuong_xa', 'ASC')->get();
    }
}
