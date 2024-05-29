<?php

namespace App\Http\Controllers;

use App\Models\LSDongHoKhoiModel;
use App\Models\QLDongHoKhoiModel;
use App\Models\QLLapDatDHKhoiModel;
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
        return LSDongHoKhoiModel::select('ls_donghokhoi.*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','ql_donghokhoi.ten_dong_ho','dm_tuyendoc.ten_tuyen')
        ->join('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen')
        ->orderBy('ma_lich_su', 'DESC')->get();
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
            'numeric' => 'Chỉ số mới không hợp lệ!',
            'tu_ngay.date' => 'Từ ngày không hợp lệ!',
            'den_ngay.date' => 'Đến ngày đến không hợp lệ!',
        ];
        $validator = Validator::make($request->all(),[
            'ky_chi_so' => 'required',
            'tu_ngay' => 'required|date',
            'den_ngay' => 'required|date',
            'chi_so_moi' => 'required|numeric',
            'ma_lap_dat' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $lich_su_cu = LSDongHoKhoiModel::where('ma_lap_dat',$request->ma_lap_dat)->orderBy('ma_lich_su','DESC')->first();
        $lich_su = new LSDongHoKhoiModel;
        $lich_su->ky_chi_so=$request->ky_chi_so;
        $lich_su->khoa=0;
        if(!empty($lich_su_cu)&&$request->tu_ngay<$lich_su_cu->den_ngay){
            return response()->json([
                'error' => 'Từ ngày không hợp lệ!'
            ],422);
        }
        else{
            $lich_su->tu_ngay=$request->tu_ngay;
        }
        $lich_su->den_ngay=$request->den_ngay;
        $lich_su->ma_lap_dat=$request->ma_lap_dat;
        if(empty($lich_su_cu)){
            $lich_su->chi_so_cu=0;
            $lich_su->chi_so_moi=$request->chi_so_moi; 
        }
        else{
            if($request->chi_so_moi<$lich_su_cu->chi_so_moi){
                return response()->json([
                    'error' => 'Chỉ số mới không hợp lệ!'
                ],422);
            }
            else{
                $lich_su->chi_so_moi=$request->chi_so_moi; 
            }
            $lich_su->chi_so_cu=$lich_su_cu->chi_so_moi;
            $lich_su_cu->khoa=1;
            $lich_su_cu->save();
        }
        $lich_su->so_tieu_thu=$lich_su->chi_so_moi-$lich_su->chi_so_cu;
        $result = $lich_su->save();
        if($result){
            return response()->json([
                'message' => 'Ghi chỉ số thành công!'
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
            ->join('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
            ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen')->where("ma_lich_su",$id)->firstOrFail();
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
            'numeric' => 'Chỉ số mới không hợp lệ',
            'tu_ngay.date' => 'Ngày từ không hợp lệ',
            'den_ngay.date' => 'Ngày đến không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'tu_ngay' => 'date',
            'den_ngay' => 'date',
            'chi_so_moi' => 'numeric',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $lich_su = LSDongHoKhoiModel::findOrFail($id);
            $lich_su_cu = LSDongHoKhoiModel::where('ma_lap_dat',$request->ma_lap_dat)->orderBy('ma_lich_su','DESC')->skip(1)->first();
            $lich_su_moi_nhat = LSDongHoKhoiModel::where('ma_lap_dat',$lich_su->ma_lap_dat)->orderBy('ma_lich_su', 'DESC')->first();
            $lap_dat = QLLapDatDHKhoiModel::select('ql_lapdatdhkhoi.*','ql_donghokhoi.tinh_trang')
            ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
            ->where('ma_lap_dat',$lich_su->ma_lap_dat)->first();
            
            if($lich_su_moi_nhat->ma_lich_su == $id){
                if(isset($request->ky_chi_so)){
                    $lich_su->ky_chi_so=$request->ky_chi_so;
                }
                if(isset($request->tu_ngay)){
                    if(!empty($lich_su_cu)&&$request->tu_ngay<$lich_su_cu->den_ngay){
                        return response()->json([
                            'message' => 'Chỉ số mới không hợp lệ!'
                          ]);
                    }
                    else{
                        $lich_su->tu_ngay=$request->tu_ngay;
                    }
                    
                }
                if(isset($request->den_ngay)){
                    $lich_su->den_ngay=$request->den_ngay;
                    if($lap_dat->tinh_trang == 0){
                        $lap_dat->den_ngay=$request->den_ngay;
                        $lap_dat->save();
                    }   
                }
                if(isset($request->chi_so_moi)){
                    if($request->chi_so_moi<$lich_su->chi_so_cu){
                        return response()->json([
                            'message' => 'Chỉ số mới không hợp lệ!'
                          ]);
                    }
                    else{
                        $lich_su->chi_so_moi=$request->chi_so_moi;
                    }
                    if($lap_dat->tinh_trang == 0){
                        $lap_dat->chi_so_cuoi=$request->chi_so_cuoi;
                        $lap_dat->save();
                    }
                }
                if(isset($request->khoa)){
                    $lich_su->khoa=$request->khoa;
                }
                $lich_su->so_tieu_thu=$lich_su->chi_so_moi-$lich_su->chi_so_cu;
                $result = $lich_su->save();
            }
            else{
                return response()->json([
                    'error' => 'Lịch sử đồng hồ không thể cập nhật!'
                  ],422);
            }
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
            $lich_su_moi_nhat = LSDongHoKhoiModel::where('ma_lap_dat',$lich_su->ma_lap_dat)->orderBy('ma_lich_su', 'DESC')->first();
            $lich_su_moi_nhi = LSDongHoKhoiModel::where('ma_lap_dat',$lich_su->ma_lap_dat)->orderBy('ma_lich_su', 'DESC')->skip(1)->first();
            if($lich_su_moi_nhat->ma_lich_su == $id){
                $result = $lich_su->delete();
                $dong_ho = QLDongHoKhoiModel::where('ma_dong_ho',$lich_su->lapdat->ma_dong_ho)->first();
                if($dong_ho->tinh_trang=0){
                    $lap_dat = QLLapDatDHKhoiModel::where('ma_lap_dat',$lich_su->ma_lap_dat)->orderBy('ma_lap_dat', 'DESC')->first();
                    $lap_dat->den_ngay = $lich_su_moi_nhi->den_ngay;
                    $lap_dat->chi_so_cuoi = $lich_su_moi_nhi->chi_so_moi;
                    $lap_dat->save(); 
                }
            }
            else{
                return response()->json([
                    'error' => 'Lịch sử ghi chỉ số không thể xóa!'
                  ],422);
            }
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Lịch sử ghi chỉ số không tồn tại!'
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
        $query =  LSDongHoKhoiModel::query()->select('ls_donghokhoi.*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','ql_donghokhoi.ten_dong_ho','dm_tuyendoc.ten_tuyen')
        ->join('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen');
        if($request->has('ma_dong_ho')){
            $query->where("ql_lapdatdhkhoi.ma_dong_ho",$request->ma_dong_ho);
        }
        if($request->has('ma_tuyen')){
            $query->where("ql_lapdatdhkhoi.ma_tuyen",$request->ma_tuyen);
        }
        $result = $query->orderBy('ma_lich_su', 'DESC')->get();
        return $result;
    }
    public function get_list_dhkhoi(Request $request)
    {
        $query = DB::table('ls_donghokhoi as ls_donghokhoi')
            ->select('ls_donghokhoi.*','dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap','dm_tuyendoc.ten_tuyen','ql_donghokhoi.tinh_trang')
            ->join('ql_lapdatdhkhoi','ql_lapdatdhkhoi.ma_lap_dat','=','ls_donghokhoi.ma_lap_dat')
            ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen')
            ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhoi.ma_loai_dong_ho')
            ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhoi.ma_co_dong_ho')
            ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhoi.ma_nha_cung_cap');
        if($request->has('ma_dong_ho')){
            $query->where("ql_lapdatdhkhoi.ma_dong_ho",$request->ma_dong_ho);
        }
        if($request->has('ma_tuyen')){
            $query->where("ql_lapdatdhkhoi.ma_tuyen",$request->ma_tuyen);
        }
        $query=$query->leftJoin('ls_donghokhoi as n', function ($join) {
                $join->on('ls_donghokhoi.ma_lap_dat', '=', 'n.ma_lap_dat')
                    ->whereRaw(DB::raw('ls_donghokhoi.ma_lich_su < n.ma_lich_su'));
            })
            ->whereNull('n.ma_lap_dat')
            ->get();
        return $query;
    }
    public function lookup_dh_khoi()
    {
        $query =  QLLapDatDHKhoiModel::query()->select('*')->where('den_ngay',null)->get();       
        return $query;
    }
}
