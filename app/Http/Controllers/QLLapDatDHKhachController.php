<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLLapDatDHKhachModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;

class QLLapDatDHKhachController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLLapDatDHKhachModel::select('*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','ql_donghokhach.ten_dong_ho','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen')
        ->orderBy('ma_lap_dat', 'ASC')->get();
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
            'chi_so_dau.numeric' => 'Chỉ số đầu không hợp lệ',
            'chi_so_cuoi.numeric' => 'Chỉ số cuối không hợp lệ',
            'ngay_lap_dat.date' => 'Ngày lắp đặt không hợp lệ',
            'ngay_ket_thuc.date' => 'Ngày kết thúc không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'chi_so_dau' => 'required|numeric',
            'chi_so_cuoi' => 'required|numeric',
            'trang_thai' => 'required',
            'ngay_lap_dat' => 'required|date',
            'ngay_ket_thuc' => 'date',
            'ma_dong_ho' => 'required',
            'ma_tuyen' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $lap_dat = new QLLapDatDHKhachModel; 
        $lap_dat->chi_so_dau=$request->chi_so_dau;
        if($request->has('chi_so_cuoi')){
            $lap_dat->chi_so_cuoi=$request->chi_so_cuoi;
            $lap_dat->so_tieu_thu=$request->chi_so_cuoi-$request->chi_so_dau;
        }
        $lap_dat->trang_thai=$request->trang_thai;
        $lap_dat->ngay_lap_dat=$request->ngay_lap_dat;
        if($request->has('ngay_ket_thuc')){
            $lap_dat->ngay_ket_thuc=$request->ngay_ket_thuc;
        }
        $lap_dat->ma_dong_ho=$request->ma_dong_ho;
        $lap_dat->ma_tuyen=$request->ma_tuyen;
        $result = $lap_dat->save();
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
            return QLLapDatDHKhachModel::select('*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','ql_donghokhach.ten_dong_ho','dm_tuyendoc.ten_tuyen')
            ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen')->where("ma_lap_dat",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử lắp đặt không tồn tại!'
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
            'required' => 'Xin hãy điền đủ thông tin!',
            'chi_so_dau.number' => 'Chỉ số đầu không hợp lệ',
            'chi_so_cuoi.number' => 'Chỉ số cuối không hợp lệ',
            'ngay_lap_dat.date' => 'Ngày lắp đặt không hợp lệ',
            'ngay_ket_thuc.date' => 'Ngày kết thúc không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'chi_so_dau' => 'required',
            'chi_so_cuoi' => 'required',
            'trang_thai' => 'required',
            'ngay_lap_dat' => 'required|date',
            'ngay_ket_thuc' => 'date',
            'ma_dong_ho' => 'required',
            'ma_tuyen' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $lap_dat = QLLapDatDHKhachModel::findOrFail($id); 
            if(isset($request->chi_so_dau)){
                $lap_dat->chi_so_dau=$request->chi_so_dau;
            }
            if(isset($request->chi_so_cuoi)){
                $lap_dat->chi_so_cuoi=$request->chi_so_cuoi;
                $lap_dat->so_tieu_thu=$request->chi_so_cuoi-$lap_dat->chi_so_dau;
            }
            if(isset($request->trang_thai)){
                $lap_dat->trang_thai=$request->trang_thai;
            }
            if(isset($request->ngay_lap_dat)){
                $lap_dat->ngay_lap_dat=$request->ngay_lap_dat;
            }
            if(isset($request->ngay_ket_thuc)){
                $lap_dat->ngay_ket_thuc=$request->ngay_ket_thuc;
            }
            if(isset($request->ma_dong_ho)){
                $lap_dat->ma_dong_ho=$request->ma_dong_ho;
            }
            if(isset($request->ma_tuyen)){
                $lap_dat->ma_tuyen=$request->ma_tuyen;
            }
            $result = $lap_dat->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử lắp đặt không tồn tại!'
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
            $lap_dat = QLLapDatDHKhachModel::findOrFail($id);
            $result = $lap_dat->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử lắp đặt không tồn tại!'
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
        $query =  QLLapDatDHKhachModel::query()->select('*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','ql_donghokhach.ten_dong_ho','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen');
        if($request->has('ten_dong_ho')){
            $query->where("ten_dong_ho","like","%".$request->ten_dong_ho."%");
        }
        if($request->has('ma_dong_ho')){
            $query->where("ql_lapdatdhkhoi.ma_dong_ho","like","%".$request->ma_dong_ho."%");
        }
        if($request->has('ma_tuyen')){
            $query->where("ql_lapdatdhkhoi.ma_tuyen",$request->ma_tuyen);
        }
        if($request->has('tinh_trang')){
            $query->where("tinh_trang",$request->tinh_trang);
        }
        $result = $query->orderBy('ma_lap_dat', 'ASC')->get();
        return $result;
    }
}
