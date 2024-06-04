<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLKhachHangModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  
use Illuminate\Validation\Rule;

class QLKhachHangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
  {
    return QLKhachHangModel::orderBy('ma_khach_hang', 'DESC')->get();
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
      'sdt.max_digits' => 'Số điện thoại không hợp lệ!',
      'sdt.min_digits' => 'Số điện thoại không hợp lệ!',
      'can_cuoc.max_digits' => 'Số căn cước công dân không hợp lệ!',
      'can_cuoc.min_digits' => 'Số căn cước công dân không hợp lệ!',
      'unique' => 'Số căn cước công dân đã tồn tại!'
    ];
    $validator = Validator::make($request->all(), [
      'ten_khach_hang' => 'required',
      'can_cuoc' => 'required|max_digits:12|min_digits:12|unique:ql_khachhang,can_cuoc',
      'dia_chi' => 'required',
      'email' => 'required',
      'sdt' => 'required|max_digits:10|min_digits:10',
    ], $message);

    if ($validator->fails()) {
      return response()->json([
        'error' => $validator->errors(),
      ],422);
    }
    $khach_hang = new QLKhachHangModel;
    $khach_hang->ten_khach_hang = $request->ten_khach_hang;
    $khach_hang->can_cuoc = $request->can_cuoc;
    $khach_hang->dia_chi = $request->dia_chi;
    $khach_hang->email = $request->email;
    $khach_hang->sdt = $request->sdt;
    $khach_hang->ngay_dang_ky = date("y-m-d");
    $result = $khach_hang->save();
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
        return QLKhachHangModel::where("ma_khach_hang", $id)->firstOrFail();
    }catch (ModelNotFoundException $e) {
        return response()->json([
           'error' => 'Khách hàng không tồn tại!'
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
          'sdt.max_digits' => 'Số điện thoại không hợp lệ!',
          'sdt.min_digits' => 'Số điện thoại không hợp lệ!',
          'can_cuoc.max_digits' => 'Số căn cước công dân không hợp lệ!',
          'can_cuoc.min_digits' => 'Số căn cước công dân không hợp lệ!',
          'unique' => 'Số căn cước công dân đã tồn tại!'
        ];
        $validator = Validator::make($request->all(),[
            'sdt' => 'max_digits:10|min_digits:10',
            'can_cuoc' => [
              'max_digits:12|min_digits:12',
              Rule::unique('ql_khachhang', 'can_cuoc')->ignore($id, 'ma_khach_hang')
            ],
          ],$message);
        
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                ],422);
        }
        try{
            $khach_hang = QLKhachHangModel::findOrFail($id); 
            if(isset($request->ten_khach_hang)){
                $khach_hang->ten_khach_hang=$request->ten_khach_hang;
            }
            if(isset($request->can_cuoc)){
              $khach_hang->can_cuoc=$request->can_cuoc;
          }
            if(isset($request->email)){
                $khach_hang->email=$request->email;
            }
            if(isset($request->sdt)){
                $khach_hang->sdt=$request->sdt;
            }
            if(isset($request->dia_chi)){
                $khach_hang->dia_chi=$request->dia_chi;
            }
            $result = $khach_hang->save();
        }catch (ModelNotFoundException $e) {
            return response()->json([
               'error' => 'Khách hàng không tồn tại!'
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
        $khach_hang = QLKhachHangModel::findOrFail($id);
        $result = $khach_hang->delete();
    }catch (ModelNotFoundException $e) {
        return response()->json([
           'error' => 'Khách hàng không tồn tại!'
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
    $query = QLKhachHangModel::query();
    if ($request->has('ma_khach_hang')) {
      $query->where('ma_khach_hang', "like", "%" . $request->ma_khach_hang . "%");
    }
    if ($request->has('ten_khach_hang')) {
      $query->where('ten_khach_hang', "like", "%" . $request->ten_khach_hang . "%");
    }
    if ($request->has('can_cuoc')) {
      $query->where('can_cuoc', "like", "%" . $request->can_cuoc . "%");
    }
    if ($request->has('email')) {
      $query->where('email', "like", "%" . $request->email . "%");
    }
    if ($request->has('sdt')) {
      $query->where('sdt', "like", "%" . $request->sdt . "%");
    }
    $result = $query->orderBy('ma_khach_hang', 'ASC')->get();
    return $result;
  }
}
