<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLDongHoKhachModel;
use App\Models\QLHoaDonModel;
use App\Models\QLHopDongModel;
use App\Models\QLLapDatDHKhachModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;

class QLDongHoKhachController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLDongHoKhachModel::select('ql_donghokhach.*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap')
        ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhach.ma_loai_dong_ho')
        ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhach.ma_co_dong_ho')
        ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhach.ma_nha_cung_cap')
        ->orderBy('ma_dong_ho', 'ASC')->get();
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
            'ten_dong_ho.unique' => 'Đồng hồ khách đã tồn tại!',
            'so_seri.unique' => 'Số seri đã tồn tại!',
            'ngay_nhap.date' => 'Ngày nhập không hợp lệ',
            'ngay_kiem_dinh.date' => 'Ngày kiểm định không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'ten_dong_ho' => 'required|unique:ql_donghokhach,ten_dong_ho',
            'ngay_nhap' => 'required|date',
            'ngay_kiem_dinh' => 'required|date',
            'nam_san_xuat' => 'required',
            'so_seri' => 'required|unique:ql_donghokhach,so_seri',
            'so_nam_hieu_luc' => 'required',
            'so_thang_bao_hanh' => 'required',
            'ma_loai_dong_ho' => 'required',
            'ma_nha_cung_cap' => 'required',
            'ma_co_dong_ho' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $dong_ho_khach = new QLDongHoKhachModel; 
        $dong_ho_khach->ten_dong_ho=$request->ten_dong_ho;
        $dong_ho_khach->tinh_trang=0;
        $dong_ho_khach->nam_san_xuat=$request->nam_san_xuat;
        $dong_ho_khach->so_seri=$request->so_seri;
        $dong_ho_khach->ngay_nhap=$request->ngay_nhap;
        $dong_ho_khach->ngay_kiem_dinh=$request->ngay_kiem_dinh;
        $dong_ho_khach->so_nam_hieu_luc=$request->so_nam_hieu_luc;
        $dong_ho_khach->so_thang_bao_hanh=$request->so_thang_bao_hanh;
        $dong_ho_khach->ma_loai_dong_ho=$request->ma_loai_dong_ho;
        $dong_ho_khach->ma_nha_cung_cap=$request->ma_nha_cung_cap;
        $dong_ho_khach->ma_co_dong_ho=$request->ma_co_dong_ho;
        $result = $dong_ho_khach->save();
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
            return QLDongHoKhachModel::select('*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap')
            ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhach.ma_loai_dong_ho')
            ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhach.ma_co_dong_ho')
            ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhach.ma_nha_cung_cap')
            ->where("ma_dong_ho",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Đồng hồ khối không tồn tại!'
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
            'ten_dong_ho.unique' => 'Đồng hồ khách đã tồn tại!',
            'so_seri.unique' => 'Số seri đã tồn tại!',
            'ngay_nhap.date' => 'Ngày nhập không hợp lệ',
            'ngay_kiem_dinh.date' => 'Ngày kiểm định không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'ten_dong_ho' => [
                Rule::unique('ql_donghokhach', 'ten_dong_ho')->ignore($id, 'ma_dong_ho')
              ],
              'ngay_nhap' => 'date',
              'ngay_kiem_dinh' => 'date',
              'so_seri' => [
                Rule::unique('ql_donghokhach', 'so_seri')->ignore($id, 'ma_dong_ho')
              ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $dong_ho_khach = QLDongHoKhachModel::findOrFail($id); 
            if(isset($request->ten_dong_ho)){
                $dong_ho_khach->ten_dong_ho=$request->ten_dong_ho;
            }
            if(isset($request->ngay_nhap)){
                $dong_ho_khach->ngay_nhap=$request->ngay_nhap;
            }
            if(isset($request->ngay_kiem_dinh)){
                $dong_ho_khach->ngay_kiem_dinh=$request->ngay_kiem_dinh;
            }
            if(isset($request->nam_san_xuat)){
                $dong_ho_khach->nam_san_xuat=$request->nam_san_xuat;
            }
            if(isset($request->so_seri)){
                $dong_ho_khach->so_seri=$request->so_seri;
            }
            if(isset($request->so_nam_hieu_luc)){
                $dong_ho_khach->so_nam_hieu_luc=$request->so_nam_hieu_luc;
            }
            if(isset($request->so_thang_bao_hanh)){
                $dong_ho_khach->so_thang_bao_hanh=$request->so_thang_bao_hanh;
            }
            if(isset($request->ma_loai_dong_ho)){
                $dong_ho_khach->ma_loai_dong_ho=$request->ma_loai_dong_ho;
            }
            if(isset($request->ma_nha_cung_cap)){
                $dong_ho_khach->ma_nha_cung_cap=$request->ma_nha_cung_cap;
            }
            if(isset($request->ma_co_dong_ho)){
                $dong_ho_khach->ma_co_dong_ho=$request->ma_co_dong_ho;
            }
            $result = $dong_ho_khach->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Đồng hồ khách hàng không tồn tại!'
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
            $dong_ho_khach = QLDongHoKhachModel::findOrFail($id);
            $lap_dat = QLLapDatDHKhachModel::where('ma_dong_ho',$id)->orderBy('ma_lap_dat','DESC')->get();
            if(count($lap_dat)==0){
                $result = $dong_ho_khach->delete();
            }
            else{
                return response()->json([
                    'error' => 'Đồng hồ khách hàng đang được sử dụng!'
                ],422);
            }
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Đồng hồ khách hàng không tồn tại!'
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
        $query =  QLDongHoKhachModel::query()->select('ql_donghokhach.*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap')
        ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhach.ma_loai_dong_ho')
        ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhach.ma_co_dong_ho')
        ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhach.ma_nha_cung_cap');
        if($request->has('ma_dong_ho')){
          $query->where("ma_dong_ho",$request->ma_dong_ho);
        }
        if($request->has('ten_dong_ho')){
            $query->where("ten_dong_ho","like","%".$request->ten_dong_ho."%");
        }
        if($request->has('ma_loai_dong_ho')){
            $query->where("ql_donghokhach.ma_loai_dong_ho",$request->ma_loai_dong_ho);
        }
        if($request->has('ma_nha_cung_cap')){
          $query->where("ql_donghokhach.ma_nha_cung_cap",$request->ma_nha_cung_cap);
      }
        if($request->has('so_seri')){
          $query->where("so_seri",$request->so_seri);
        }
        if($request->has('ngay_nhap_tu')&&$request->has('ngay_nhap_den')){
            $query->whereBetween('ngay_nhap', [$request->ngay_nhap_tu, $request->ngay_nhap_den]);
        }
        if($request->has('ngay_kiem_dinh_tu')&&$request->has('ngay_kiem_dinh_den')){
            $query->whereBetween('ngay_kiem_dinh', [$request->ngay_kiem_dinh_tu, $request->ngay_kiem_dinh_den]);
        }
        if($request->has('so_nam_hieu_luc_tu')&&$request->has('so_nam_hieu_luc_den')){
            $query->whereBetween('so_nam_hieu_luc', [$request->so_nam_hieu_luc_tu, $request->so_nam_hieu_luc_den]);
        }
        if($request->has('so_thang_bao_hanh_tu')&&$request->has('so_thang_bao_hanh_den')){
            $query->whereBetween('so_thang_bao_hanh', [$request->so_thang_bao_hanh_tu, $request->so_thang_bao_hanh_den]);
        }
        if($request->has('ma_co_dong_ho')){
            $query->where("ql_donghokhach.ma_co_dong_ho",$request->ma_co_dong_ho);
        }
        if($request->has('tinh_trang')){
            $query->where("tinh_trang",$request->tinh_trang);
        }
        $result = $query->orderBy('ma_dong_ho', 'ASC')->get();
        return $result;
    }
}