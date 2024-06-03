<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DMTuyenDocModel;
use App\Models\QLDongHoKhachModel;
use App\Models\QLHoaDonModel;
use App\Models\QLHopDongModel;
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
        return QLLapDatDHKhachModel::select('ql_lapdatdhkhach.*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhoi.ma_hop_dong')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
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
            'ma_hop_dong' => 'required',
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        $lap_dat = new QLLapDatDHKhachModel; 
        $lap_dat_cu = QLLapDatDHKhachModel::where('ma_dong_ho',$request->ma_dong_ho)->first();
        $dong_ho = QLDongHoKhachModel::where('ma_dong_ho',$request->ma_dong_ho)->first();
        $hop_dong = QLHopDongModel::where('ma_hop_dong',$request->ma_hop_dong)->first();
        if($dong_ho->tinh_trang==0&&$hop_dong->trang_thai==0){
            $lap_dat->ma_dong_ho=$request->ma_dong_ho;
            $lap_dat->ma_hop_dong=$request->ma_hop_dong;
            $dong_ho->tinh_trang=1;
            $hop_dong->trang_thai=1;
            $dong_ho->save();
            $hop_dong->save();
        }
        else{
            return response()->json([
                'error' => 'Đồng hồ hoặc hợp đồng đã được lắp đặt!'
              ],422);
        }
        if(strtotime($request->tu_ngay)>strtotime($hop_dong->ngay_lap)){
            $lap_dat->tu_ngay=$request->tu_ngay;
        }
        else{
            return response()->json([
                'error' => 'Ngày lắp trước ngày lập hợp đồng!'
                ],422);
        }
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
            return QLLapDatDHKhachModel::select('ql_lapdatdhkhach.*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','dm_tuyendoc.ten_tuyen')
            ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhoi.ma_dong_ho')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhoi.ma_hop_dong')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
            ->where("ma_lap_dat",$id)->firstOrFail();
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
            $lap_dat = QLLapDatDHKhachModel::findOrFail($id); 
            $lap_dat_moi_nhat = QLLapDatDHKhachModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->orderBy('ma_lap_dat', 'DESC')->first();
            $lap_dat_cu = QLLapDatDHKhachModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->orderBy('ma_lap_dat', 'DESC')->skip(1)->first();
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
            $lap_dat = QLLapDatDHKhachModel::findOrFail($id);
            $lap_dat_moi_nhat = QLLapDatDHKhachModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->orderBy('ma_lap_dat', 'DESC')->first();
            $chi_so = QLHoaDonModel::where('ma_lap_dat',$id)->get();
            if($lap_dat_moi_nhat->ma_lap_dat == $id&&count($chi_so)==0){
                $result = $lap_dat->delete();
                $dong_ho = QLDongHoKhachModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->first();
                $hop_dong = QLHopDongModel::where('ma_hop_dong',$lap_dat->ma_hop_dong)->first();
                $hop_dong->trang_thai=0;
                $dong_ho->tinh_trang=0;
                $dong_ho->save();
                $hop_dong->save();
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
        $query =  QLLapDatDHKhachModel::query()->select('ql_lapdatdhkhach.*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen');
        if($request->has('ten_dong_ho')){
            $query->where("ten_dong_ho","like","%".$request->ten_dong_ho."%");
        }
        if($request->has('ma_dong_ho')){
            $query->where("ql_lapdatdhkhach.ma_dong_ho","like","%".$request->ma_dong_ho."%");
        }
        if($request->has('ma_tuyen')){
            $query->where("ql_hopdong.ma_tuyen",$request->ma_tuyen);
        }
        if($request->has('ma_hop_dong')){
            $query->where("ql_lapdatdhkhach.ma_hop_dong",$request->ma_hop_dong);
        }
        if($request->has('tinh_trang')){
            $query->where("ql_donghokhach.tinh_trang",$request->tinh_trang);
        }
        if($request->has('can_cuoc')){
            $query->where("ql_khachhang.can_cuoc",$request->can_cuoc);
        }
        $result = $query->orderBy('ma_lap_dat', 'DESC')->get();
        return $result;
    }
    public function go_lap_dat_dh_khach(Request $request){
        if($request->has('ma_hop_dong')){
            $lap_dat = QLLapDatDHKhachModel::where('ma_hop_dong',$request->ma_hop_dong)->orderBy('ma_lap_dat','DESC')->first();
        }
        if($request->has('ma_dong_ho')){
            $lap_dat = QLLapDatDHKhachModel::where('ma_dong_ho',$request->ma_dong_ho)->orderBy('ma_lap_dat','DESC')->first();
        }
        $dong_ho_khach = QLDongHoKhachModel::where('ma_dong_ho',$lap_dat->ma_dong_ho)->first(); 
        $hop_dong = QLHopDongModel::where('ma_hop_dong',$lap_dat->ma_hop_dong)->first();
        $chi_so = QLHoaDonModel::where('ma_lap_dat',$lap_dat->ma_lap_dat)->orderBy('ma_hoa_don','DESC')->first();
        if($dong_ho_khach->tinh_trang==1&&$hop_dong->trang_thai==1){
            $dong_ho_khach->tinh_trang=0;
            $hop_dong->trang_thai=0;
            $hop_dong->save();
            $dong_ho_khach->save();
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
    public function lookup_dh_hop_dong(Request $request){
        if($request->has('ma_hop_dong')){
            $lap_dat = QLLapDatDHKhachModel::where('ma_hop_dong',$request->ma_hop_dong)->orderBy('ma_lap_dat','DESC')->first();
        }
        if($request->has('ma_dong_ho')){
            $lap_dat = QLLapDatDHKhachModel::where('ma_dong_ho',$request->ma_dong_ho)->orderBy('ma_lap_dat','DESC')->first();
        }
        $query = $lap_dat->select('ql_donghokhach.*','ql_hopdong.*','ql_hopdong.dia_chi as dia_chi_hop_dong', 'dm_loaidongho.ten_loai_dong_ho','dm_codongho.ten_co_dong_ho','dm_nhacungcap.ten_nha_cung_cap', 'ql_nhomgia.ten_nhom_gia','ql_khachhang.*', 'dm_tuyendoc.ten_tuyen')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('dm_loaidongho','dm_loaidongho.ma_loai_dong_ho','=','ql_donghokhach.ma_loai_dong_ho')
        ->join('dm_codongho','dm_codongho.ma_co_dong_ho','=','ql_donghokhach.ma_co_dong_ho')
        ->join('dm_nhacungcap','dm_nhacungcap.ma_nha_cung_cap','=','ql_donghokhach.ma_nha_cung_cap')
        ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen');
        return $query->orderBy('ma_lap_dat','desc')->first();        
    }
}
