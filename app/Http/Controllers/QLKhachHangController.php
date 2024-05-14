<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\QLKhachHangModel;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;  

class QLKhachHangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
  {
    return QLKhachHangModel::orderBy('ma_khach_hang', 'ASC')->get();
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
      'max' => 'Số điện thoại không hợp lệ!'
    ];
    $validator = Validator::make($request->all(), [
      'ten_khach_hang' => 'required',
      'dia_chi' => 'required',
      'email' => 'required',
      'sdt' => 'required|max:10',
    ], $message);

    if ($validator->fails()) {
      return response()->json([
        'error' => $validator->errors(),
      ],422);
    }
    $khach_hang = new QLKhachHangModel;
    $khach_hang->ten_khach_hang = $request->ten_khach_hang;
    $khach_hang->dia_chi = $request->dia_chi;
    $khach_hang->email = $request->email;
    $khach_hang->sdt = $request->sdt;
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
            'required' => 'Xin hãy điền đủ thông tin!',
            'max' => 'Số điện thoại không hợp lệ!'
        ];
        $validator = Validator::make($request->all(),[
            'ten_khach_hang' => 'required',
            'dia_chi' => 'required',
            'email' => 'required',
            'sdt' => 'required|max:10',
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
    if ($request->has('dia_chi')) {
      $query->where('dia_chi', "like", "%" . $request->dia_chi . "%");
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
