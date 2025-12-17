<?php

namespace App\Mail;

use App\Models\ClientRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ClientBookingInfoMail extends Mailable
{
    use Queueable, SerializesModels;

    public ClientRequest $clientRequest;
    /**
     * Create a new message instance.
     */
    public function __construct(ClientRequest $clientRequest)
    {
        //
        $this->clientRequest = $clientRequest;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Client Booking Info Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.client-booking',
            with: [
                'request' => $this->clientRequest,
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
