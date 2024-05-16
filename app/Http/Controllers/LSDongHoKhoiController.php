<?php

namespace App\Http\Controllers;

use App\Models\LSDongHoKhoiModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class LSDongHoKhoiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LSDongHoKhoiModel::select('*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','ql_donghokhoi.ten_dong_ho','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ls_donghokhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ls_donghokhoi.ma_tuyen')
        ->orderBy('ma_lich_su', 'ASC')->get();
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
            'numeric' => 'Chỉ số mới không hợp lệ',
            'tu_ngay.date' => 'Ngày từ không hợp lệ',
            'den_ngay.date' => 'Ngày đến không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'ky_chi_so' => 'required',
            'tu_ngay' => 'required|date',
            'den_ngay' => 'required|date',
            'chi_so_moi' => 'required',
            'ma_dong_ho' => 'required',
            'ma_tuyen' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $lich_su_cu = LSDongHoKhoiModel::where('ma_dong_ho',$request->ma_dong_ho)->orderBy('ma_lich_su','DESC')->first();
        $lich_su = new LSDongHoKhoiModel; 
        $lich_su->ky_chi_so=$request->ky_chi_so;
        if(empty($lich_su_cu)){
            $lich_su->chi_so_cu=0;
        }
        else{
            $lich_su->chi_so_cu=$lich_su_cu->chi_so_moi;
        }
        $lich_su->khoa=$request->khoa;
        $lich_su->tu_ngay=$request->tu_ngay;
        $lich_su->den_ngay=$request->den_ngay;
        $lich_su->chi_so_moi=$request->chi_so_moi;
        $lich_su->so_tieu_thu=$lich_su->chi_so_moi-$lich_su->chi_so_cu;
        $lich_su->ma_dong_ho=$request->ma_dong_ho;
        $lich_su->ma_tuyen=$request->ma_tuyen;
        $result = $lich_su->save();
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
            return LSDongHoKhoiModel::select('*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','ql_donghokhoi.ten_dong_ho','dm_tuyendoc.ten_tuyen')
            ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ls_donghokhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ls_donghokhoi.ma_tuyen')->where("ma_lich_su",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử đồng hồ không tồn tại!'
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
            'numeric' => 'Chỉ số mới không hợp lệ',
            'tu_ngay.date' => 'Ngày từ không hợp lệ',
            'den_ngay.date' => 'Ngày đến không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'ky_chi_so' => 'required',
            'tu_ngay' => 'required|date',
            'den_ngay' => 'required|date',
            'chi_so_moi' => 'required|numeric',
            'khoa' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $lich_su = LSDongHoKhoiModel::findOrFail($id); 
            if(isset($request->ky_chi_so)){
                $lich_su->ky_chi_so=$request->ky_chi_so;
            }
            if(isset($request->tu_ngay)){
                $lich_su->tu_ngay=$request->tu_ngay;
            }
            if(isset($request->den_ngay)){
                $lich_su->den_ngay=$request->den_ngay;
            }
            if(isset($request->chi_so_moi)){
                $lich_su->chi_so_moi=$request->chi_so_moi;
            }
            if(isset($request->khoa)){
                $lich_su->khoa=$request->khoa;
            }
            $lich_su->so_tieu_thu=$lich_su->chi_so_moi-$lich_su->chi_so_cu;
            $result = $lich_su->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử đồng hồ không tồn tại!'
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
            $lich_su = LSDongHoKhoiModel::findOrFail($id);
            $result = $lich_su->delete();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử đồng hồ không tồn tại!'
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
        $query =  LSDongHoKhoiModel::query()->select('*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','ql_donghokhoi.ten_dong_ho','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ls_donghokhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ls_donghokhoi.ma_tuyen');
        if($request->has('ma_dong_ho')){
            $query->where("ma_dong_ho",$request->ma_dong_ho);
        }
        $result = $query->orderBy('ma_lich_su', 'DESC')->get();
        return $result;
    }
    public function get_list_dhkhoi(Request $request)
    {
        $query = DB::table('ls_donghokhoi as ls_donghokhoi')
            ->select('ls_donghokhoi.*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap','dm_tuyendoc.ten_tuyen','ql_donghokhoi.tinh_trang')
            ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ls_donghokhoi.ma_dong_ho')
            ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhoi.ma_loai_dong_ho')
            ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhoi.ma_co_dong_ho')
            ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhoi.ma_nha_cung_cap')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ls_donghokhoi.ma_tuyen');
        if($request->has('ma_dong_ho')){
            $query->where("ls_donghokhoi.ma_dong_ho",$request->ma_dong_ho);
        }
        if($request->has('ma_tuyen')){
            $query->where("ls_donghokhoi.ma_tuyen",$request->ma_tuyen);
        }
        $query=$query->leftJoin('ls_donghokhoi as n', function ($join) {
                $join->on('ls_donghokhoi.ma_dong_ho', '=', 'n.ma_dong_ho')
                    ->whereRaw(DB::raw('ls_donghokhoi.ma_lich_su < n.ma_lich_su'));
            })
            ->whereNull('n.ma_dong_ho')
            ->get();
        return $query;
    }
}
