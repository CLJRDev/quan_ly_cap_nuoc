<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
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

        DB::transaction(function () use ($tai_khoan_google, &$tai_khoan) {
            $tai_khoan_social = TaiKhoanSocialModel::firstOrNew(
                ['ma_social' => $tai_khoan_google->getId(), 'nguon_social' => 'google'],
                ['ten_social' => $tai_khoan_google->getName()]
            );

            if (!($tai_khoan = $tai_khoan_social->tai_khoan)) {
                $tai_khoan = QLTaiKhoanModel::create([
                    'email' => $tai_khoan_google->getEmail(),
                    'ho_ten' => $tai_khoan_google->getName(),
                ]);
                $tai_khoan_social->fill(['ma_nhan_vien' => $tai_khoan->ma_nhan_vien])->save();
            }
        });

        return Response::json([
            'user' => new UserResource($tai_khoan),
            'google_user' => $tai_khoan_google,
        ]);
    }
}
