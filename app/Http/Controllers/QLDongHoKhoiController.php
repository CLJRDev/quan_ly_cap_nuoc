<?php

namespace App\Http\Controllers;

use App\Models\LSDongHoKhoiModel;
use App\Models\QLDongHoKhoiModel;
use App\Models\QLLapDatDHKhoiModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;

class QLDongHoKhoiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLDongHoKhoiModel::select('ql_donghokhoi.*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap')
        ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhoi.ma_loai_dong_ho')
        ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhoi.ma_co_dong_ho')
        ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhoi.ma_nha_cung_cap')
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
            'unique' => 'Đồng hồ khối đã tồn tại!',
            'ngay_nhap.date' => 'Ngày nhập không hợp lệ',
            'ngay_kiem_dinh.date' => 'Ngày kiểm định không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'ten_dong_ho' => 'required|unique:ql_donghokhoi,ten_dong_ho',
            'ngay_nhap' => 'required|date',
            'ngay_kiem_dinh' => 'required|date',
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
        $dong_ho_khoi = new QLDongHoKhoiModel; 
        $dong_ho_khoi->ten_dong_ho=$request->ten_dong_ho;
        $dong_ho_khoi->tinh_trang=0;
        $dong_ho_khoi->ngay_nhap=$request->ngay_nhap;
        $dong_ho_khoi->ngay_kiem_dinh=$request->ngay_kiem_dinh;
        $dong_ho_khoi->so_nam_hieu_luc=$request->so_nam_hieu_luc;
        $dong_ho_khoi->so_thang_bao_hanh=$request->so_thang_bao_hanh;
        $dong_ho_khoi->ma_loai_dong_ho=$request->ma_loai_dong_ho;
        $dong_ho_khoi->ma_nha_cung_cap=$request->ma_nha_cung_cap;
        $dong_ho_khoi->ma_co_dong_ho=$request->ma_co_dong_ho;
        $result = $dong_ho_khoi->save();
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
            return QLDongHoKhoiModel::select('*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap')
            ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhoi.ma_loai_dong_ho')
            ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhoi.ma_co_dong_ho')
            ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhoi.ma_nha_cung_cap')
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
            'unique' => 'Đồng hồ khối đã tồn tại!',
            'ngay_nhap.date' => 'Ngày nhập không hợp lệ',
            'ngay_kiem_dinh.date' => 'Ngày kiểm định không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'ten_dong_ho' => [
                Rule::unique('ql_donghokhoi', 'ten_dong_ho')->ignore($id, 'ma_dong_ho')
              ],
              'ngay_nhap' => 'date',
              'ngay_kiem_dinh' => 'date',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $dong_ho_khoi = QLDongHoKhoiModel::findOrFail($id); 
            $lap_dat = QLLapDatDHKhoiModel::where('ma_dong_ho',$id)->orderBy('ma_lap_dat','DESC')->first();
            if(isset($request->ten_dong_ho)){
                $dong_ho_khoi->ten_dong_ho=$request->ten_dong_ho;
            }
            if(isset($request->tinh_trang)){
                if($dong_ho_khoi->tinh_trang==1&&$request->tinh_trang==0&&!empty($lap_dat)){
                    $chi_so = LSDongHoKhoiModel::where('ma_lap_dat',$lap_dat->ma_lap_dat)->orderBy('ma_lich_su','DESC')->first();
                    $dong_ho_khoi->tinh_trang=$request->tinh_trang;
                    if(empty($chi_so)){
                        $lap_dat->chi_so_cuoi=$lap_dat->chi_so_dau;
                        $lap_dat->den_ngay=$lap_dat->tu_ngay;
                        $lap_dat->so_tieu_thu=$lap_dat->chi_so_cuoi-$lap_dat->chi_so_dau;
                        $lap_dat->save();
                    }
                    else{
                        $lap_dat->chi_so_cuoi=$chi_so->chi_so_moi;
                        $lap_dat->den_ngay=$chi_so->den_ngay;
                        $lap_dat->so_tieu_thu=$lap_dat->chi_so_cuoi-$lap_dat->chi_so_dau;
                        $lap_dat->save();
                    }
                }
                else{
                    return response()->json([
                        'error' => 'Không thể đổi tình trạng của đồng hồ!'
                     ],422);
                }
            }
            if(isset($request->ngay_nhap)){
                $dong_ho_khoi->ngay_nhap=$request->ngay_nhap;
            }
            if(isset($request->ngay_kiem_dinh)){
                $dong_ho_khoi->ngay_kiem_dinh=$request->ngay_kiem_dinh;
            }
            if(isset($request->so_nam_hieu_luc)){
                $dong_ho_khoi->so_nam_hieu_luc=$request->so_nam_hieu_luc;
            }
            if(isset($request->so_thang_bao_hanh)){
                $dong_ho_khoi->so_thang_bao_hanh=$request->so_thang_bao_hanh;
            }
            if(isset($request->ma_loai_dong_ho)){
                $dong_ho_khoi->ma_loai_dong_ho=$request->ma_loai_dong_ho;
            }
            if(isset($request->ma_nha_cung_cap)){
                $dong_ho_khoi->ma_nha_cung_cap=$request->ma_nha_cung_cap;
            }
            if(isset($request->ma_co_dong_ho)){
                $dong_ho_khoi->ma_co_dong_ho=$request->ma_co_dong_ho;
            }
            $result = $dong_ho_khoi->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Đồng hồ khối không tồn tại!'
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
            $dong_ho_khoi = QLDongHoKhoiModel::findOrFail($id);
            $lap_dat = QLLapDatDHKhoiModel::where('ma_dong_ho',$id)->orderBy('ma_lap_dat','DESC')->get();
            if(count($lap_dat)==0){
                $result = $dong_ho_khoi->delete();
            }
            else{
                return response()->json([
                    'error' => 'Đồng hồ khối đang được sử dụng!'
                ],422);
            }
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Đồng hồ khối không tồn tại!'
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
        $query =  QLDongHoKhoiModel::query()->select('*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap')
        ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhoi.ma_loai_dong_ho')
        ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhoi.ma_co_dong_ho')
        ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhoi.ma_nha_cung_cap');
        if($request->has('ten_dong_ho')){
            $query->where("ten_dong_ho","like","%".$request->ten_dong_ho."%");
        }
        if($request->has('ma_dong_ho')){
            $query->where("ma_dong_ho",$request->ma_dong);
        }
        if($request->has('ma_loai_dong_ho')){
            $query->where("ma_loai_dong_ho",$request->ma_loai_dong_ho);
        }
        if($request->has('ma_co_dong_ho')){
            $query->where("ma_co_dong_ho",$request->ma_co_dong_ho);
        }
        if($request->has('so_nam_hieu_luc')){
            $query->where("so_nam_hieu_luc",$request->so_nam_hieu_luc);
        }
        if($request->has('tinh_trang')){
            $query->where("tinh_trang",$request->tinh_trang);
        }
        $result = $query->orderBy('ma_dong_ho_khoi', 'ASC')->get();
        return $result;
    }
}
