<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMCoDongHoModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  

class DMCoDongHoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMCoDongHoModel::all();
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
            'unique' => 'Cỡ đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_co_dong_ho' => 'required|unique:dm_codongho,ten_co_dong_ho',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        $co_dong_ho = new DMCoDongHoModel; 
        $co_dong_ho->ten_co_dong_ho=$request->ten_co_dong_ho;
        $result = $co_dong_ho->save();
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
            return DMCoDongHoModel::where("ma_co_dong_ho",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Cỡ đồng hồ không tồn tại!'
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
            'required' => 'Xin hãy điền đủ thông tin!',
            'unique' => 'Cỡ đồng hồ đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_co_dong_ho' => 'required|unique:dm_codongho,ten_co_dong_ho',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'message' => $validator->errors(),
                ]);
        }
        try{
            $co_dong_ho = DMCoDongHoModel::findOrFail($id); 
            if(isset($request->ten_co_dong_ho)){
                $co_dong_ho->ten_co_dong_ho=$request->ten_co_dong_ho;
            }
            $result = $co_dong_ho->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Cỡ đồng hồ không tồn tại!'
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
            $co_dong_ho = DMCoDongHoModel::findOrFail($id);
            $result = $co_dong_ho->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'message' => 'Cỡ đồng hồ không tồn tại!'
            ]);
        }
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
        return DMCoDongHoModel::where("ten_co_dong_ho","like","%".$request->ten_co_dong_ho."%")->orderBy('ma_co_dong_ho', 'ASC')->get();
    }
}
