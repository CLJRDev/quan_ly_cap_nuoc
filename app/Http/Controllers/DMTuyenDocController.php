<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMTuyenDocModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class DMTuyenDocController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DMTuyenDocModel::select('*')
        ->join('dm_toquanly','dm_toquanly.ma_to_quan_ly','=','dm_tuyendoc.ma_to_quan_ly')
        ->join('dm_phuongxa','dm_phuongxa.ma_phuong_xa','=','dm_tuyendoc.ma_phuong_xa')
        ->orderBy('ma_tuyen', 'ASC')->get();
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
            'unique' => 'Tuyến đọc đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_tuyen' => 'required|unique:dm_tuyendoc,ten_tuyen',
            'ma_to_quan_ly' => 'required',
            'ma_phuong_xa' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $tuyen = new DMTuyenDocModel; 
        $tuyen->ten_tuyen=$request->ten_tuyen;
        $tuyen->trang_thai=0;
        $tuyen->ma_to_quan_ly=$request->ma_to_quan_ly;
        $tuyen->ma_phuong_xa=$request->ma_phuong_xa;
        $result = $tuyen->save();
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
            return DMTuyenDocModel::select('ma_tuyen','ten_tuyen','dm_tuyendoc.ma_phuong_xa','dm_phuongxa.ten_phuong_xa','dm_tuyendoc.ma_to_quan_ly','dm_toquanly.ten_to_quan_ly')
                ->join('dm_toquanly','dm_toquanly.ma_to_quan_ly','=','dm_tuyendoc.ma_to_quan_ly')
                ->join('dm_phuongxa','dm_phuongxa.ma_phuong_xa','=','dm_tuyendoc.ma_phuong_xa')
                ->where("ma_tuyen",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Tuyến đọc không tồn tại!'
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
            'unique' => 'Tuyến đọc đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'ten_tuyen' => [
                Rule::unique('dm_tuyendoc', 'ten_tuyen')->ignore($id, 'ma_tuyen')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $tuyen = DMTuyenDocModel::findOrFail($id); 
            if(isset($request->ten_tuyen)){
                $tuyen->ten_tuyen=$request->ten_tuyen;
            }
            if(isset($request->ma_to_quan_ly)){
                $tuyen->ma_to_quan_ly=$request->ma_to_quan_ly;
            }
            if(isset($request->ma_phuong_xa)){
                $tuyen->ma_phuong_xa=$request->ma_phuong_xa;
            }
            $result = $tuyen->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Tuyến đọc không tồn tại!'
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
            $tuyen = DMTuyenDocModel::findOrFail($id);
            $result = $tuyen->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Tuyến đọc không tồn tại!'
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
        $tuyen = DMTuyenDocModel::query()->select('*')
        ->join('dm_toquanly','dm_toquanly.ma_to_quan_ly','=','dm_tuyendoc.ma_to_quan_ly')
        ->join('dm_phuongxa','dm_phuongxa.ma_phuong_xa','=','dm_tuyendoc.ma_phuong_xa');
        if($request->has('ten_tuyen')){
            $tuyen->where('ten_tuyen',"like","%".$request->ten_tuyen."%");
        }
        if($request->has('ma_to_quan_ly')){
            $tuyen->where('dm_tuyendoc.ma_to_quan_ly',$request->ma_to_quan_ly);
        }
        if($request->has('ma_phuong_xa')){
            $tuyen->where('dm_tuyendoc.ma_phuong_xa',$request->ma_phuong_xa);
        }
        if($request->has('trang_thai')){
            $tuyen->where('dm_tuyendoc.trang_thai',$request->trang_thai);
        }
        return $tuyen->orderBy('ma_tuyen', 'ASC')->get();
    }
}
