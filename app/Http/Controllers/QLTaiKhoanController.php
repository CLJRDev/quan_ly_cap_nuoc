<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLTaiKhoanModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;

class QLTaiKhoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QLTaiKhoanModel::orderBy('ma_nhan_vien', 'ASC')->get();
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
        $validator = Validator::make($request->all(),[
            'mat_khau' => 'required|max:100',
            'trang_thai' => 'required',
            'email' => 'required',
            'sdt' => 'required|max:10',
            'chuc_vu' => 'required',
            'ho_ten' => 'required',
            'ngay_sinh' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Xin hãy điền đủ thông tin!'
                ]);
        }
        $tai_khoan = new QLTaiKhoanModel; 
        $tai_khoan->mat_khau=md5($request->mat_khau);
        $tai_khoan->trang_thai=$request->trang_thai;
        $tai_khoan->email=$request->email;
        $tai_khoan->sdt=$request->sdt;
        $tai_khoan->chuc_vu=$request->chuc_vu;
        $tai_khoan->ho_ten=$request->ho_ten;
        $tai_khoan->ngay_sinh=$request->ngay_sinh;
        $result = $tai_khoan->save();
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
        return QLTaiKhoanModel::where("ma_nhan_vien",$id)->first();
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
        $validator = Validator::make($request->all(),[
            // 'mat_khau' => 'required',
            'trang_thai' => 'required',
            'email' => 'required',
            'sdt' => 'required',
            'chuc_vu' => 'required',
            'ho_ten' => 'required',
            'ngay_sinh' => 'required',
          ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Xin hãy điền thông tin!'
                ]);
        }
        $tai_khoan = QLTaiKhoanModel::find($id); 
        if(isset($request->mat_khau)){
            $tai_khoan->mat_khau=$request->mat_khau;
        }
        if(isset($request->email)){
            $tai_khoan->email=$request->email;
        }
        if(isset($request->sdt)){
            $tai_khoan->sdt=$request->sdt;
        }
        if(isset($request->trang_thai)){
            $tai_khoan->trang_thai=$request->trang_thai;
        }
        if(isset($request->chuc_vu)){
            $tai_khoan->chuc_vu=$request->chuc_vu;
        }
        if(isset($request->ho_ten)){
            $tai_khoan->ho_ten=$request->ho_ten;
        }
        if(isset($request->ngay_sinh)){
            $tai_khoan->ngay_sinh=$request->ngay_sinh;
        }
        $result = $tai_khoan->save();
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
        $tai_khoan = QLTaiKhoanModel::find($id);
        $result = $tai_khoan->delete();
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
        $query = QlTaiKhoanModel::query();
        if($request->has('ma_nhan_vien')){
            $query->where('ma_nhan_vien',"like","%".$request->ma_nhan_vien."%");
        }
        if($request->has('chuc_vu')){
            $query->where('chuc_vu',"like","%".$request->chuc_vu."%");
        }
        if($request->has('ho_ten')){
            $query->where('ten_nguoi_dung',"like","%".$request->ten_nguoi_dung."%");
        }
        if($request->has('email')){
            $query->where('email',"like","%".$request->email."%");
        }
        if($request->has('sdt')){
            $query->where('sdt',"like","%".$request->sdt."%");
        }
        if($request->has('trang_thai')){
            $query->where('trang_thai',$request->trang_thai);
        }
        $result = $query->orderBy('ma_nhan_vien', 'ASC')->get();
        return $result;
    }
    public function login(Request $request)
    {
        $ma_nhan_vien = $request->ma_nhan_vien;
        $mat_khau = md5($request->mat_khau);
        $tai_khoans = QLTaiKhoanModel::where('ma_nhan_vien', '=', $ma_nhan_vien)->where('trang_thai', '=',1);
        session()->put('bao_loi', '');
        if ($tai_khoans->count() == 0) {
            session()->put('bao_loi', 'Tài khoản không tồn tại');
        } else {
            $nguoi_dung = $tai_khoans->first();
            if ($nguoi_dung->mat_khau != $mat_khau) {
                session()->put('bao_loi', 'Sai mật khẩu!');
            } else {
                session()->put('bao_loi', '');
                session()->put('nguoi_dung', $ma_nhan_vien);
            }
        }
        if (session('bao_loi') == '') {
            session()->flash('status', 'Task was successful!');
			return response()->json([
                // 'message' => 'Đăng nhập thành công!',
                'message' => session('status'),
                'login' => 'true'
              ]);
            
        } else {
            return response()->json([
                'message' => session('bao_loi'),
                'login' => 'false'
              ]);
        }
    }
    public function logout(){
        session()->flush();
        return response()->json([
            'message' => 'Đăng xuất thành công!',
            'login' => 'false'
          ]);
    }
}
