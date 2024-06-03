<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\HoaDonMail;
use App\Models\QLDongHoKhachModel;
use App\Models\QLHoaDonModel;
use App\Models\QLHopDongModel;
use App\Models\QLLapDatDHKhachModel;
use App\Models\QLPhanQuyenModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException; 
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class QLHoaDonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLHoaDonModel::select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_donghokhach.ma_dong_ho','ql_donghokhach.tinh_trang','dm_tuyendoc.ten_tuyen','ql_khachhang.ten_khach_hang')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
        ->whereRaw('ql_hoadon.so_tieu_thu > 0')
        ->orderBy('ma_hoa_don', 'DESC')->get();
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
            'ky_hoa_don' => 'required',
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
        $hoa_don_cu = QLHoaDonModel::where('ma_lap_dat',$request->ma_lap_dat)->orderBy('ma_hoa_don','DESC')->first();
        $hoa_don = new QLHoaDonModel;
        $nhom_gia = QLLapDatDHKhachModel::select('ql_nhomgia.*')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
            ->where('ma_lap_dat',$request->ma_lap_dat)->first();
        $hoa_don->ky_hoa_don=$request->ky_hoa_don;
        $hoa_don->khoa=0;
        if(!empty($hoa_don_cu)&&$request->tu_ngay<$hoa_don_cu->den_ngay){
            return response()->json([
                'error' => 'Từ ngày không hợp lệ!'
            ],422);
        }
        else{
            $hoa_don->tu_ngay=$request->tu_ngay;
        }
        $hoa_don->den_ngay=$request->den_ngay;
        if(empty($hoa_don_cu)){
            $hoa_don->chi_so_cu=0;
            $hoa_don->chi_so_moi=$request->chi_so_moi; 
        }
        else{
            if($request->chi_so_moi<$hoa_don_cu->chi_so_moi){
                return response()->json([
                    'error' => 'Chỉ số mới không hợp lệ!'
                ],422);
            }
            else{
                $hoa_don->chi_so_moi=$request->chi_so_moi; 
            }
            $hoa_don->chi_so_cu=$hoa_don_cu->chi_so_moi;
            $hoa_don_cu->khoa=1;
            $hoa_don_cu->save();
        }
        $hoa_don->so_tieu_thu=$hoa_don->chi_so_moi-$hoa_don->chi_so_cu;
        if($nhom_gia->hs_rieng!=null){
            $hoa_don->tong_tien_truoc_thue=($nhom_gia->hs_rieng*$nhom_gia->gia_ban)*$hoa_don->so_tieu_thu;
        }
        else{
            if($hoa_don->so_tieu_thu<10){
                $hoa_don->tong_tien_truoc_thue=($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*$hoa_don->so_tieu_thu;
            }
            elseif($hoa_don->so_tieu_thu>=10&&$hoa_don->so_tieu_thu<20){
                $hoa_don->tong_tien_truoc_thue=(($nhom_gia->hs_tu_10m_den_20m*$nhom_gia->gia_ban)*($hoa_don->so_tieu_thu-9))+(($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*9);
            }
            elseif($hoa_don->so_tieu_thu>=20&&$hoa_don->so_tieu_thu<30){
                $hoa_don->tong_tien_truoc_thue=(($nhom_gia->hs_tu_20m_den_30m*$nhom_gia->gia_ban)*($hoa_don->so_tieu_thu-19))+(($nhom_gia->hs_tu_10m_den_20m*$nhom_gia->gia_ban)*10)+(($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*9);
            }
            else{
                $hoa_don->tong_tien_truoc_thue=(($nhom_gia->hs_tren_30m*$nhom_gia->gia_ban)*($hoa_don->so_tieu_thu-29))+(($nhom_gia->hs_tu_20m_den_30m*$nhom_gia->gia_ban)*10)+(($nhom_gia->hs_tu_10m_den_20m*$nhom_gia->gia_ban)*10)+(($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*9);
            }
        }
        $hoa_don->tong_tien_thue=$hoa_don->tong_tien_truoc_thue*$nhom_gia->hs_thue;
        $hoa_don->tong_cong=$hoa_don->tong_tien_truoc_thue+$hoa_don->tong_tien_thue;
        $hoa_don->trang_thai=0;
        $hoa_don->ma_lap_dat=$request->ma_lap_dat;
        $result = $hoa_don->save();
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
            return QLHoaDonModel::select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_hopdong.dia_chi','dm_tuyendoc.ma_tuyen','ql_khachhang.ten_khach_hang','ql_khachhang.ma_khach_hang','ql_khachhang.sdt','ql_nhomgia.gia_ban','ql_nhomgia.hs_thue')
            ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
            ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
            ->join('ql_nhomgia','ql_hopdong.ma_nhom_gia','=','ql_nhomgia.ma_nhom_gia')
            ->where("ma_hoa_don",$id)->firstOrFail();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Hóa đơn không tồn tại!'
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
            $hoa_don = QLHoaDonModel::findOrFail($id);
            $hoa_don_cu = QLHoaDonModel::where('ma_lap_dat',$request->ma_lap_dat)->orderBy('ma_hoa_don','DESC')->skip(1)->first();
            $hoa_don_moi_nhat = QLHoaDonModel::where('ma_lap_dat',$hoa_don->ma_lap_dat)->orderBy('ma_hoa_don', 'DESC')->first();
            $lap_dat = QLLapDatDHKhachModel::select('ql_lapdatdhkhach.*','ql_donghokhach.tinh_trang')
            ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
            ->where('ma_lap_dat',$hoa_don->ma_lap_dat)->first();
            $nhom_gia = QLLapDatDHKhachModel::select('ql_nhomgia.*')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_nhomgia','ql_nhomgia.ma_nhom_gia','=','ql_hopdong.ma_nhom_gia')
            ->where('ma_lap_dat',$request->ma_lap_dat)->first();
            if($hoa_don_moi_nhat->ma_hoa_don == $id){
                if(isset($request->ky_hoa_don)){
                    $hoa_don->ky_hoa_don=$request->ky_hoa_don;
                }
                if(isset($request->tu_ngay)){
                    if(!empty($hoa_don_cu)&&$request->tu_ngay<$hoa_don_cu->den_ngay){
                        return response()->json([
                            'message' => 'Chỉ số mới không hợp lệ!'
                          ],422);
                    }
                    else{
                        $hoa_don->tu_ngay=$request->tu_ngay;
                    }
                    
                }
                if(isset($request->den_ngay)){
                    $hoa_don->den_ngay=$request->den_ngay;
                    if($lap_dat->tinh_trang == 0){
                        $lap_dat->den_ngay=$request->den_ngay;
                        $lap_dat->save();
                    }
                }
                if(isset($request->chi_so_moi)){
                    $hoa_don->chi_so_moi=$request->chi_so_moi;
                    if($lap_dat->tinh_trang == 0){
                        $lap_dat->chi_so_cuoi=$request->chi_so_cuoi;
                        $lap_dat->save();
                    }
                }
                if(isset($request->khoa)){
                    $hoa_don->khoa=$request->khoa;
                }
                if(isset($request->ma_phuong_thuc)){
                    $hoa_don->ma_phuong_thuc=$request->ma_phuong_thuc;
                }
                if($nhom_gia->hs_rieng!=null){
                    $hoa_don->tong_tien_truoc_thue=($nhom_gia->hs_rieng*$nhom_gia->gia_ban)*$hoa_don->so_tieu_thu;
                }
                else{
                    if($hoa_don->so_tieu_thu<10){
                        $hoa_don->tong_tien_truoc_thue=($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*$hoa_don->so_tieu_thu;
                    }
                    elseif($hoa_don->so_tieu_thu>=10&&$hoa_don->so_tieu_thu<20){
                        $hoa_don->tong_tien_truoc_thue=(($nhom_gia->hs_tu_10m_den_20m*$nhom_gia->gia_ban)*($hoa_don->so_tieu_thu-9))+(($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*9);
                    }
                    elseif($hoa_don->so_tieu_thu>=20&&$hoa_don->so_tieu_thu<30){
                        $hoa_don->tong_tien_truoc_thue=(($nhom_gia->hs_tu_20m_den_30m*$nhom_gia->gia_ban)*($hoa_don->so_tieu_thu-19))+(($nhom_gia->hs_tu_10m_den_20m*$nhom_gia->gia_ban)*10)+(($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*9);
                    }
                    else{
                        $hoa_don->tong_tien_truoc_thue=(($nhom_gia->hs_tren_30m*$nhom_gia->gia_ban)*($hoa_don->so_tieu_thu-29))+(($nhom_gia->hs_tu_20m_den_30m*$nhom_gia->gia_ban)*10)+(($nhom_gia->hs_tu_10m_den_20m*$nhom_gia->gia_ban)*10)+(($nhom_gia->hs_duoi_10m*$nhom_gia->gia_ban)*9);
                    }
                }
                $hoa_don->tong_tien_thue=$hoa_don->tong_tien_truoc_thue*$nhom_gia->hs_thue;
                $hoa_don->tong_cong=$hoa_don->tong_tien_truoc_thue+$hoa_don->tong_tien_thue;
                $result = $hoa_don->save();
            }
            else{
                return response()->json([
                    'error' => 'Hóa đơn không thể cập nhật!'
                  ],422);
            }
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Hóa đơn không tồn tại!'
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
            $hoa_don = QLHoaDonModel::findOrFail($id);
            $hoa_don_moi_nhat = QLHoaDonModel::where('ma_lap_dat',$hoa_don->ma_lap_dat)->orderBy('ma_hoa_don', 'DESC')->first();
            $hoa_don_moi_nhi = QLHoaDonModel::where('ma_lap_dat',$hoa_don->ma_lap_dat)->orderBy('ma_hoa_don', 'DESC')->skip(1)->first();
            if($hoa_don_moi_nhat->ma_hoa_don == $id&&$hoa_don->trang_thai !=1){
                $result = $hoa_don->delete();
                $dong_ho = QLDongHoKhachModel::where('ma_dong_ho',$hoa_don->lapdat->ma_dong_ho)->first();
                if($dong_ho->tinh_trang=0){
                    $lap_dat = QLLapDatDHKhachModel::where('ma_lap_dat',$hoa_don->ma_lap_dat)->orderBy('ma_lap_dat', 'DESC')->first();
                    if(empty($hoa_don_moi_nhi)){
                        $lap_dat->den_ngay = $lap_dat->tu_ngay;
                        $lap_dat->chi_so_cuoi = $lap_dat->chi_so_dau;
                        $lap_dat->save(); 
                    }
                    else{
                        $lap_dat->den_ngay = $hoa_don_moi_nhi->den_ngay;
                        $lap_dat->chi_so_cuoi = $hoa_don_moi_nhi->chi_so_moi;
                        $lap_dat->save(); 
                    }
                }
            }
            else{
                return response()->json([
                    'error' => 'Hóa đơn không thể xóa!'
                  ],422);
            }
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Hóa đơn không tồn tại!'
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
        $query =  QLHoaDonModel::query()->select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_donghokhach.ma_dong_ho','ql_donghokhach.tinh_trang','dm_tuyendoc.ten_tuyen','ql_khachhang.ten_khach_hang')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
        ->whereRaw('ql_hoadon.so_tieu_thu > 0');
        if($request->has('ma_dong_ho')){
            $query->where("ql_lapdatdhkhach.ma_dong_ho",$request->ma_dong_ho);
        }
        if($request->has('ma_tuyen')){
            $query->where("ql_hopdong.ma_tuyen",$request->ma_tuyen);
        }
        if($request->has('can_cuoc')){
            $query->where("ql_khachhang.can_cuoc",$request->can_cuoc);
        }
        if($request->has('ma_hop_dong')){
            $query->where("ql_lapdatdhkhach.ma_hop_dong",$request->ma_hop_dong);
        }
        if($request->has('ky_hoa_don')){
            $query->where("ql_hoadon.ky_hoa_don","like","%".$request->ky_hoa_don."%");
        }
        if($request->has('tu_ngay')&&$request->has('den_ngay')){
            $query->whereBetween('ql_hoadon.den_ngay', [$request->tu_ngay, $request->den_ngay]);
        }
        $result = $query->orderBy('ma_hoa_don', 'DESC')->get();
        return $result;
    }
    public function get_list_dhkhach(Request $request)
    {
        $query = DB::table('ql_hoadon as ql_hoadon')
            ->select('ql_hoadon.*','ql_donghokhach.ten_dong_ho','ql_donghokhach.tinh_trang','dm_tuyendoc.ten_tuyen')
            ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
            ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen');
        if($request->has('ma_dong_ho')){
            $query->where("ql_lapdatdhkhach.ma_dong_ho",$request->ma_dong_ho);
        }
        if($request->has('ma_tuyen')){
            $query->where("ql_hopdong.ma_tuyen",$request->ma_tuyen);
        }
        if($request->has('can_cuoc')){
            $query->where("ql_khachhang.can_cuoc",$request->can_cuoc);
        }
        if($request->has('ma_hop_dong')){
            $query->where("ql_lapdatdhkhach.ma_hop_dong",$request->ma_hop_dong);
        }
        $query=$query->leftJoin('ql_hoadon as n', function ($join) {
                $join->on('ql_hoadon.ma_lap_dat', '=', 'n.ma_lap_dat')
                    ->whereRaw(DB::raw('ql_hoadon.ma_hoa_don < n.ma_hoa_don'));
            })
            ->whereNull('n.ma_lap_dat')
            ->get();
        return $query;
    }
    public function lookup_dh_khach()
    {
        $query =  QLLapDatDHKhachModel::query()->select('*')->where('den_ngay',null)->get();    
        return $query;
    }
    public function check_tuyen(Request $request)
    {
        $query =  QLPhanQuyenModel::select('ma_tuyen')
        ->where(['ma_nhan_vien'=>$request->ma_nhan_vien,'ma_quyen'=>$request->ma_quyen])->first();    
        if(empty($query)){
            return response()->json([
                'error' => 'Không có quyền ghi chỉ số!'
              ],422);
        }
        else return $query;
    }
    public function send_bill(Request $request)
    {      
      $hoa_don = QLHoaDonModel::select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_hopdong.dia_chi as dia_chi_hop_dong','dm_tuyendoc.ten_tuyen','ql_khachhang.ten_khach_hang','ql_khachhang.ma_khach_hang','ql_khachhang.sdt','ql_nhomgia.gia_ban','ql_nhomgia.hs_thue','ql_khachhang.dia_chi as dia_chi_khach','ql_khachhang.email')
        ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
        ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
        ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
        ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
        ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
        ->join('ql_nhomgia','ql_hopdong.ma_nhom_gia','=','ql_nhomgia.ma_nhom_gia')
        ->where('ma_hoa_don',$request->ma_hoa_don)->first();
    if(empty($hoa_don)){
      return response()->json([
        'error' => 'Hóa đơn không tồn tại!'
      ],422);
    }
    else{
        $hoa_don->khoa=1;
        $thong_tin = [
            'ma_hoa_don' => $hoa_don->ma_hoa_don,
            'ky_hoa_don' => $hoa_don->ky_hoa_don,
            'chi_so_cu' => $hoa_don->chi_so_cu,
            'chi_so_moi' => $hoa_don->chi_so_moi,
            'so_tieu_thu' => $hoa_don->so_tieu_thu,
            'tong_tien_thue' => $hoa_don->tong_tien_thue,
            'tong_tien_truoc_thue' => $hoa_don->tong_tien_truoc_thue,
            'tong_cong' => $hoa_don->tong_cong,
            'email' => $hoa_don->email,
            'tu_ngay' => $hoa_don->tu_ngay,
            'den_ngay' => $hoa_don->den_ngay,
            'ma_hop_dong' => $hoa_don->ma_hop_dong,
            'dia_chi_khach' => $hoa_don->dia_chi_khach,
            'dia_chi_hop_dong' => $hoa_don->dia_chi_hop_dong,
            'ten_tuyen' => $hoa_don->ten_tuyen,
            'ten_khach_hang' => $hoa_don->ten_khach_hang,
            'ma_khach_hang' => $hoa_don->ma_khach_hang,
            'sdt' => $hoa_don->sdt,
            'gia_ban' => $hoa_don->gia_ban,
            'hs_thue' => $hoa_don->hs_thue,
            'day'=> date("d"),
            'month' => date("m"),
            'year' => date("Y"),
            ];
        $result = Mail::to($hoa_don->email)->send(new HoaDonMail($thong_tin));
        if($result){
        return response()->json([
          'message' => 'Gửi mail thành công!'
        ]);
      }
    }
  }
    public function export_bill(Request $request)
        {
        $hoa_don = QLHoaDonModel::select('ql_hoadon.*','ql_hopdong.ma_hop_dong','ql_hopdong.dia_chi as dia_chi_hop_dong','dm_tuyendoc.ten_tuyen','ql_khachhang.ten_khach_hang','ql_khachhang.ma_khach_hang','ql_khachhang.sdt','ql_nhomgia.gia_ban','ql_nhomgia.hs_thue','ql_khachhang.dia_chi as dia_chi_khach','ql_khachhang.email')
            ->join('ql_lapdatdhkhach','ql_lapdatdhkhach.ma_lap_dat','=','ql_hoadon.ma_lap_dat')
            ->join('ql_donghokhach','ql_donghokhach.ma_dong_ho','=','ql_lapdatdhkhach.ma_dong_ho')
            ->join('ql_hopdong','ql_hopdong.ma_hop_dong','=','ql_lapdatdhkhach.ma_hop_dong')
            ->join('ql_khachhang','ql_khachhang.ma_khach_hang','=','ql_hopdong.ma_khach_hang')
            ->join('dm_tuyendoc','dm_tuyendoc.ma_tuyen','=','ql_hopdong.ma_tuyen')
            ->join('ql_nhomgia','ql_hopdong.ma_nhom_gia','=','ql_nhomgia.ma_nhom_gia')
            ->where('ma_hoa_don',$request->ma_hoa_don)->first();
        if(empty($hoa_don)){
        return response()->json([
            'error' => 'Hóa đơn không tồn tại!'
        ],422);
        }
        else{
            $hoa_don->khoa=1;
            $thong_tin = [
                'ma_hoa_don' => $hoa_don->ma_hoa_don,
                'ky_hoa_don' => $hoa_don->ky_hoa_don,
                'chi_so_cu' => $hoa_don->chi_so_cu,
                'chi_so_moi' => $hoa_don->chi_so_moi,
                'so_tieu_thu' => $hoa_don->so_tieu_thu,
                'tong_tien_thue' => $hoa_don->tong_tien_thue,
                'tong_tien_truoc_thue' => $hoa_don->tong_tien_truoc_thue,
                'tong_cong' => $hoa_don->tong_cong,
                'email' => $hoa_don->email,
                'tu_ngay' => $hoa_don->tu_ngay,
                'den_ngay' => $hoa_don->den_ngay,
                'ma_hop_dong' => $hoa_don->ma_hop_dong,
                'dia_chi_khach' => $hoa_don->dia_chi_khach,
                'dia_chi_hop_dong' => $hoa_don->dia_chi_hop_dong,
                'ten_tuyen' => $hoa_don->ten_tuyen,
                'ten_khach_hang' => $hoa_don->ten_khach_hang,
                'ma_khach_hang' => $hoa_don->ma_khach_hang,
                'sdt' => $hoa_don->sdt,
                'gia_ban' => $hoa_don->gia_ban,
                'hs_thue' => $hoa_don->hs_thue,
                'day'=> date("d"),
                'month' => date("m"),
                'year' => date("Y"),
                ];
            $result = Mail::to($hoa_don->email)->send(new HoaDonMail($thong_tin));
            if($result){
            return response()->json([
            'message' => 'Gửi mail thành công!'
            ]);
        }
        }
    }
}
