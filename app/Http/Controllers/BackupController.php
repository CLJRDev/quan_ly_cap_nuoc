<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\HttpFoundation\Response;

class BackupController extends Controller
{
    public function backup()
    {
        try {
            Artisan::call('database:backup');
            $output = Artisan::output();

            return response()->json([
                'message' => 'Đã backup lại database thành công',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Đã xảy ra lỗi khi backup lại database',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
