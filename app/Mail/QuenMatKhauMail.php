<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class QuenMatKhauMail extends Mailable
{
    use Queueable, SerializesModels;
    public $thong_tin;

    /**
     * Create a new message instance.
     */
    public function __construct($thong_tin)
    {
        $this->thong_tin = $thong_tin;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            // from: new Address('QuanLyTaiKhoan@qlcn.com', 'Quản lý tài khoản Cấp nước Hải Phòng'),
            subject: 'Cài đặt lại mật khẩu',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'quen_mat_khau',
            with: [
                'thong_tin' => $this->thong_tin,
            ],
            // text: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
