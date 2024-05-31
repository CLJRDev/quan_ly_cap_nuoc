<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class HoaDonMail extends Mailable
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
            subject: 'Hóa đơn tiền nước tháng '.date("m-Y"),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $image = env('APP_URL')."/logo.png";
        return new Content(
            view: 'hoa_don',
            with: [
                'thong_tin' => $this->thong_tin,
                'image' => $image,

            ],
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
