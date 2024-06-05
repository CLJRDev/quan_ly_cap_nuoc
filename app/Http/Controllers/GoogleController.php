<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\QLPhanQuyenModel;
use App\Models\QLTaiKhoanModel;
use App\Models\SocialAccount;
use App\Models\TaiKhoanSocialModel;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function loginUrl()
    {
        return Response::json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function loginCallback()
    {
        $tai_khoan_google = Socialite::driver('google')->stateless()->user();
        $tai_khoan = null;
        $tai_khoan_ton_tai = QLTaiKhoanModel::where('email',$tai_khoan_google->email)->first();
        if(empty($tai_khoan_ton_tai)) {
            DB::transaction(function () use ($tai_khoan_google, $tai_khoan_ton_tai, &$tai_khoan) {
                $tai_khoan_social = TaiKhoanSocialModel::firstOrNew(
                    ['ma_social' => $tai_khoan_google->getId(), 'nguon_social' => 'google'],
                    ['ten_social' => $tai_khoan_google->getName()]
                );

                
                    $tai_khoan = QLTaiKhoanModel::create([
                        'email' => $tai_khoan_google->getEmail(),
                        'ho_ten' => $tai_khoan_google->getName(),
                        'mat_khau' => md5(1),
                        'trang_thai' => 1,
                        'chuc_vu' => 'Nhân viên',
                    ]);
                    $tai_khoan_social->fill(['ma_nhan_vien' => $tai_khoan->ma_nhan_vien])->save();
                });
        }
        else{
            DB::transaction(function () use ($tai_khoan_google, $tai_khoan_ton_tai, &$tai_khoan) {
            $tai_khoan_social = TaiKhoanSocialModel::firstOrNew(
                ['ma_social' => $tai_khoan_google->getId(), 'nguon_social' => 'google'],
                ['ten_social' => $tai_khoan_google->getName()]
            );
            $tai_khoan_social->fill(['ma_nhan_vien' => $tai_khoan_ton_tai->ma_nhan_vien])->save();
            });
        }
        
        $tai_khoan_moi = QLTaiKhoanModel::where('email',$tai_khoan_google->email)->first();
        $quyen = QLPhanQuyenModel::where('ma_nhan_vien',$tai_khoan_moi->ma_nhan_vien)->pluck('ma_quyen')->toArray();
        session()->put('quyen', $quyen);
        session()->put('nguoi_dung', $tai_khoan_moi->ma_nhan_vien);

        return Response::json([
            'login' => 'true',
            'quyen' =>session('quyen'),
            'nguoi_dung' => session('nguoi_dung'),
            'token' => session()->getId(),
            'user' => $tai_khoan,
            'google_user' => $tai_khoan_google,
        ]);
    }
}
