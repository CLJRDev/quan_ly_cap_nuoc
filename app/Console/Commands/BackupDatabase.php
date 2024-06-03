<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

class BackupDatabase extends Command
{
    protected $signature = 'database:backup';
    protected $description = 'Backup Database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $database = Config::get('database.connections.mysql.database');
        $username = Config::get('database.connections.mysql.username');
        $password = Config::get('database.connections.mysql.password');
        $host = Config::get('database.connections.mysql.host');
        $backupFile = base_path('backups/' . $database . '_' . date('Y-m-d_H-i-s') . '.sql');
        $command = "mysqldump --user={$username} --password={$password} --host={$host} {$database} > {$backupFile}";
        $result = null;
        $output = null;
        exec($command, $output, $result);
        if ($result == 0) {
            $this->info('Đã backup lại database thành công');
        } else {
            $this->error('Đã xảy ra lỗi khi backup lại database');
        }
    }
}
