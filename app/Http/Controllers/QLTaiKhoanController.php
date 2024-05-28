<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\GuiMailJob;
use App\Mail\QuenMatKhauMail;
use App\Models\QLKhachHangModel;
use App\Models\QLPhanQuyenModel;
use App\Models\QLTaiKhoanModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\Rule;

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
    $message = [
      'required' => 'Xin hãy điền đủ thông tin!',
      'same' => 'Mật khẩu xác nhận không trùng với mật khẩu!',
      'mat_khau.max' => 'Mật khẩu quá dài!',
      'sdt.max_digits' => 'Số điện thoại không hợp lệ!',
      'sdt.min_digits' => 'Số điện thoại không hợp lệ!',
      'sdt.unique' => 'Số điện thoại đã tồn tại!',
      'sdt.numeric' => 'Số điện thoại không hợp lệ!',
      'email.unique' => 'Email đã tồn tại!',
    ];
    $validator = Validator::make($request->all(), [
      'mat_khau' => 'required|max_digits:100',
      'xac_nhan_mat_khau' => 'required|max_digits:100|same:mat_khau',
      'trang_thai' => 'required',
      'email' => 'required|unique:ql_taikhoan,email',
      'sdt' => 'required|max_digits:10|min_digits:10|numeric|unique:ql_taikhoan,sdt',
      'chuc_vu' => 'required',
      'ho_ten' => 'required',
      'ngay_sinh' => 'required',
    ], $message);

    if ($validator->fails()) {
      return response()->json([
        'error' => $validator->errors(),
      ],422);
    }
    $tai_khoan = new QLTaiKhoanModel;
    $tai_khoan->mat_khau = md5($request->mat_khau);
    $tai_khoan->trang_thai = $request->trang_thai;
    $tai_khoan->email = $request->email;
    $tai_khoan->sdt = $request->sdt;
    $tai_khoan->chuc_vu = $request->chuc_vu;
    $tai_khoan->ho_ten = $request->ho_ten;
    $tai_khoan->ngay_sinh = $request->ngay_sinh;
    $result = $tai_khoan->save();
    if ($result) {
      return response()->json([
        'message' => 'Tạo thành công!'
      ]);
    } else {
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
        return QLTaiKhoanModel::where("ma_nhan_vien", $id)->firstOrFail();
    }catch (ModelNotFoundException $e) {
        return response()->json([
           'error' => 'Tài khoản không tồn tại!'
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
            'same' => 'Mật khẩu xác nhận không trùng với mật khẩu!',
            'mat_khau.max_digits' => 'Mật khẩu quá dài!',
            'sdt.max_digits' => 'Số điện thoại không hợp lệ!',
            'sdt.min_digits' => 'Số điện thoại không hợp lệ!',
            'sdt.unique' => 'Số điện thoại đã tồn tại!',
            'sdt.numeric' => 'Số điện thoại không hợp lệ!',
            'email.unique' => 'Email đã tồn tại!',
        ];
        $validator = Validator::make($request->all(),[
            'mat_khau' => 'max_digits:100',
            'xac_nhan_mat_khau' => 'max_digits:100|same:mat_khau',
            'sdt' => ['max_digits:10|min_digits:10|numeric',
              Rule::unique('ql_taikhoan', 'sdt')->ignore($id, 'ma_nhan_vien')
            ],
            'email' => [
              Rule::unique('ql_taikhoan', 'email')->ignore($id, 'ma_nhan_vien')
            ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $tai_khoan = QLTaiKhoanModel::findOrFail($id); 
            if(isset($request->mat_khau)){
                $tai_khoan->mat_khau=md5($request->mat_khau);
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
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Tài khoản không tồn tại!'
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
        $tai_khoan = QLTaiKhoanModel::findOrFail($id);
        $result = $tai_khoan->delete();
    }catch (ModelNotFoundException $e) {
        return response()->json([
           'error' => 'Tài khoản không tồn tại!'
        ],422);
    }
    
    if ($result) {
      return response()->json([
        'message' => 'Xóa thành công!'
      ]);
    } else {
      return response()->json([
        'error' => 'Lỗi!'
      ],422);
    }
  }
  public function search(Request $request)
  {
    $query = QlTaiKhoanModel::query();
    if ($request->has('ma_nhan_vien')) {
      $query->where('ma_nhan_vien', "like", "%" . $request->ma_nhan_vien . "%");
    }
    if ($request->has('chuc_vu')) {
      $query->where('chuc_vu', "like", "%" . $request->chuc_vu . "%");
    }
    if ($request->has('ho_ten')) {
      $query->where('ho_ten', "like", "%" . $request->ho_ten . "%");
    }
    if ($request->has('email')) {
      $query->where('email', "like", "%" . $request->email . "%");
    }
    if ($request->has('sdt')) {
      $query->where('sdt', "like", "%" . $request->sdt . "%");
    }
    if ($request->has('trang_thai')) {
      $query->where('trang_thai', $request->trang_thai);
    }
    $result = $query->orderBy('ma_nhan_vien', 'ASC')->get();
    return $result;
  }
  public function login(Request $request)
  {
    $ma_nhan_vien = $request->ma_nhan_vien;
    $mat_khau = md5($request->mat_khau);
    $tai_khoans = QLTaiKhoanModel::where('ma_nhan_vien', $ma_nhan_vien);
    session()->put('bao_loi', '');
    session()->put('trang_thai', 200);
    if ($tai_khoans->count() == 0) {
      session()->put('bao_loi', 'Tài khoản không tồn tại');
      session()->put('trang_thai', 422);
    } else {
        if($tai_khoans->where('trang_thai', '=', 1)->count() == 0) {
            session()->put('bao_loi', 'Tài khoản bị khóa');
            session()->put('trang_thai', 422);
        }
        else{
            $nguoi_dung = $tai_khoans->first();
            if ($nguoi_dung->mat_khau != $mat_khau) {
                session()->put('bao_loi', 'Sai mật khẩu!');
                session()->put('trang_thai', 401);
            } else {
                $quyen = QLPhanQuyenModel::where('ma_nhan_vien',$ma_nhan_vien)->pluck('ma_quyen')->toArray();
                session()->put('quyen', $quyen);
                session()->put('bao_loi', '');
                session()->put('nguoi_dung', $ma_nhan_vien);
            }
        }
    }
    if (session('trang_thai') == 200) {
      return response()->json([
        'login' => 'true',
        'quyen' =>session('quyen'),
        'nguoi_dung' => session('nguoi_dung'),
        'token' => session()->getId(),
    ],session('trang_thai'));
    } else {
      return response()->json([
        'error' => session('bao_loi'),
        'login' => 'false'
      ],session('trang_thai'));
    }
  }
  public function logout()
  {
    session()->flush();
    return response()->json([
      'message' => 'Đăng xuất thành công!',
      'login' => 'false'
    ]);
  }
  public function send_confirmation(Request $request)
  {
    $tai_khoan = QLTaiKhoanModel::where('email',$request->email)->first();
    if(empty($tai_khoan)){
      return response()->json([
        'error' => 'Email không tồn tại!'
      ],422);
    }
    else{
      $code = rand(100000,999999);
      $thong_tin = [
        'email' => $request->email,
        'code' => $code,
      ];
      session()->put('code',$code);
      $result = Mail::to($request->email)->send(new QuenMatKhauMail($thong_tin));
      if($result){
        return response()->json([
          'message' => 'Gửi mail thành công!'
        ]);
      }
    }
  }
  public function verify_confirmation(Request $request)
  {
    $code = $request->code;
    if($code == session('code')){
      return response()->json([
        'message' => 'Cập nhật mật khẩu thành công!',
        'verify' => 'true',
      ]);
    }
    else{
      return response()->json([
        'error' => 'Mã xác nhận không đúng!'
      ],422);
    }
  }
  public function reset_password(Request $request)
  {
    $message = [
      'same' => 'Mật khẩu xác nhận không trùng với mật khẩu!',
      'mat_khau.max' => 'Mật khẩu quá dài!',
      'required' => 'Xin hãy điền đủ thông tin!'
  ];
  $validator = Validator::make($request->all(),[
      'email' => 'required',
      'mat_khau' => 'max:100|required',
      'xac_nhan_mat_khau' => 'max:100|same:mat_khau|required',
    ],$message);
  if($validator->fails()){
      return response()->json([
          'error' => $validator->errors(),
          ],422);
  }
    $tai_khoan = QLTaiKhoanModel::where('email',$request->email)->first();
    $tai_khoan->mat_khau = md5($request->mat_khau);
    $result = $tai_khoan->save();
    if($result){
      return response()->json([
        'message' => 'Cập nhật mật khẩu thành công!'
      ]);
    }
  }
}
