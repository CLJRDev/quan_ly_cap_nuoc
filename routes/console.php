<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();
Schedule::command('hoa_don')->lastDayOfMonth('12:00');
// Schedule::command('hoa_don')->everyTwentySeconds();
Schedule::command('database:backup')->lastDayOfMonth('15:00');