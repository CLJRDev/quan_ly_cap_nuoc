<?php

namespace App\Http\Controllers;

use App\Models\DMTuyenDocModel;
use App\Models\LSDongHoKhoiModel;
use App\Models\QLDongHoKhoiModel;
use App\Models\QLLapDatDHKhoiModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;

class QLLapDatDHKhoiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLLapDatDHKhoiModel::select('*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen')
        ->orderBy('ma_lap_dat', 'DESC')->get();
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
            'tu_ngay.date' => 'Ngày lắp đặt không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'tu_ngay' => 'required|date',
            'ma_dong_ho' => 'required',
            'ma_tuyen' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $lap_dat = new QLLapDatDHKhoiModel; 
        $lap_dat_cu = QLLapDatDHKhoiModel::where('ma_dong_ho',$request->ma_dong_ho)->first();
        $dong_ho = QLDongHoKhoiModel::where('ma_dong_ho',$request->ma_dong_ho)->first();
        $tuyen = DMTuyenDocModel::where('ma_tuyen',$request->ma_tuyen)->first();
        if(empty($lap_dat_cu)){
            $lap_dat->chi_so_dau=0;
            $lap_dat->tu_ngay=$request->tu_ngay;
        }
        else{
            $lap_dat->chi_so_dau=$lap_dat_cu->chi_so_cuoi;
            if(strtotime($request->tu_ngay)>strtotime($lap_dat_cu->den_ngay)){
                $lap_dat->tu_ngay=$request->tu_ngay;
            }
            else{
                return response()->json([
                    'error' => 'Đồng hồ đã được lắp đặt vào thời gian này!'
                ],422);
            }
        }
        if($dong_ho->tinh_trang==0&&$tuyen->trang_thai==0){
            $lap_dat->ma_dong_ho=$request->ma_dong_ho;
            $lap_dat->ma_tuyen=$request->ma_tuyen;
            $dong_ho->tinh_trang=1;
            $tuyen->trang_thai=1;
            $dong_ho->save();
            $tuyen->save();
        }
        else{
            return response()->json([
                'error' => 'Đồng hồ hoặc tuyến đã được lắp đặt!'
              ],422);
        }
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
            return QLLapDatDHKhoiModel::select('*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','dm_tuyendoc.ten_tuyen')
            ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
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
            'tu_ngay.date' => 'Ngày lắp đặt không hợp lệ',
        ];
        $validator = Validator::make($request->all(),[
            'tu_ngay' => 'date',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $lap_dat = QLLapDatDHKhoiModel::findOrFail($id); 
            $lap_dat_moi_nhat = QLLapDatDHKhoiModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->orderBy('ma_lap_dat', 'DESC')->first();
            $lap_dat_cu = QLLapDatDHKhoiModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->orderBy('ma_lap_dat', 'DESC')->skip(1)->first();
            if($lap_dat_moi_nhat->ma_lap_dat == $id){
                if(isset($request->tu_ngay)){
                    if(empty($lap_dat_cu)){
                        $lap_dat->tu_ngay=$request->tu_ngay;
                    }
                    else{
                        if(strtotime($request->tu_ngay)>strtotime($lap_dat_cu->tu_ngay)){
                            $lap_dat->tu_ngay=$request->tu_ngay;
                        }
                        else{
                            return response()->json([
                                'error' => 'Đồng hồ đã được lắp đặt vào thời gian này!'
                             ],422);
                        }
                    }
                    
                }
                $result = $lap_dat->save();
            }
            else{
                return response()->json([
                    'error' => 'Lịch sử lắp đặt không thể cập nhật!'
                  ],422);
            }
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
            $lap_dat = QLLapDatDHKhoiModel::findOrFail($id);
            $lap_dat_moi_nhat = QLLapDatDHKhoiModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->orderBy('ma_lap_dat', 'DESC')->first();
            $chi_so = LSDongHoKhoiModel::where('ma_lap_dat',$id)->get();
            if($lap_dat_moi_nhat->ma_lap_dat == $id&&count($chi_so)==0){
                $result = $lap_dat->delete();
                $dong_ho = QLDongHoKhoiModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->first();
                $tuyen = DMTuyenDocModel::where('ma_tuyen',$lap_dat->ma_tuyen)->first();
                $tuyen->trang_thai=0;
                $dong_ho->tinh_trang=0;
                $dong_ho->save();
                $tuyen->save();
            }
            else{
                return response()->json([
                    'error' => 'Lịch sử lắp đặt không thể xóa!'
                  ],422);
            }
            
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
        $query =  QLLapDatDHKhoiModel::query()->select('ql_lapdatdhkhoi.*','ql_donghokhoi.ten_dong_ho','ql_donghokhoi.tinh_trang','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
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
            $query->where("ql_donghokhoi.tinh_trang",$request->tinh_trang);
        }
        $result = $query->orderBy('ma_lap_dat', 'DESC')->get();
        return $result;
    }
    public function go_lap_dat_dh_khoi(Request $request){
        if($request->has('ma_tuyen')){
            $lap_dat = QLLapDatDHKhoiModel::where('ma_tuyen',$request->ma_tuyen)->orderBy('ma_lap_dat','DESC')->first();
        }
        if($request->has('ma_dong_ho')){
            $lap_dat = QLLapDatDHKhoiModel::where('ma_dong_ho',$request->ma_dong_ho)->orderBy('ma_lap_dat','DESC')->first();
        }
        $dong_ho_khoi = QLDongHoKhoiModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->first(); 
        $tuyen = DMTuyenDocModel::where('ma_tuyen',$lap_dat->ma_tuyen)->first();
        $chi_so = LSDongHoKhoiModel::where('ma_lap_dat',$lap_dat->ma_lap_dat)->orderBy('ma_lich_su','DESC')->first();
        if($dong_ho_khoi->tinh_trang==1&&$tuyen->trang_thai==1){
            $dong_ho_khoi->tinh_trang=0;
            $tuyen->trang_thai=0;
            $tuyen->save();
            $dong_ho_khoi->save();
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
            return response()->json([
               'message' => 'Gỡ lắp đặt thành công!'
              ]);
        }
        else{
            return response()->json([
                'error' => 'Không thể gỡ lắp đặt!'
              ],422);
        }
    }
    public function lookup_dh_tuyen(Request $request){
        if($request->has('ma_tuyen')){
            $lap_dat = QLLapDatDHKhoiModel::where('ma_tuyen',$request->ma_hop_dong)->orderBy('ma_lap_dat','DESC')->first();
        }
        if($request->has('ma_dong_ho')){
            $lap_dat = QLLapDatDHKhoiModel::where('ma_dong_ho',$request->ma_dong_ho)->orderBy('ma_lap_dat','DESC')->first();
        }
        $query = $lap_dat->select('ql_donghokhoi.*','dm_tuyendoc.*')
        ->join('ql_donghokhoi','ql_donghokhoi.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_lapdatdhkhoi.ma_tuyen');
        return $query->orderBy('ma_lap_dat','desc')->first();
    }
}
