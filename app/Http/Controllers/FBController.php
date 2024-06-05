<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;

    use App\Http\Requests;
    use App\Http\Controllers\Controller;
    use Laravel\Socialite\Facades\Socialite;

    class FBController extends Controller
    {
        public function loginUrl()
        {
            return Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl();   
        }   

        public function loginCallback()
        {
            // Sau khi xác thực Facebook chuyển hướng về đây cùng với một token
            // Các xử lý liên quan đến đăng nhập bằng mạng xã hội cũng đưa vào đây.    
        }
    }
