<?php

namespace App\Jobs;

use App\Models\ClientRequest;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Mail\ClientBookingInfoMail;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;


class SendClientBookingInfoJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

     public int $clientRequestId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $clientRequestId)
    {
        //
        $this->clientRequestId = $clientRequestId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $clientRequest = ClientRequest::with([
            'clientAssign.client',
            'clientAssign.appointment.user',
            'servicesOffer',
            'subCategory'
            ])->find($this->clientRequestId);

            if (! $clientRequest) {
                 Log::warning("SendClientBookingInfoJob: ClientRequest not found for ID {$this->clientRequestId}");
                return;
            }

            if (! $clientRequest->clientAssign || ! $clientRequest->clientAssign->client) {
                Log::warning("SendClientBookingInfoJob: Client or ClientAssign missing for ID {$this->clientRequestId}");
                return;
            }

            throw_if(
                ! $clientRequest->clientAssign?->client,
                new \Exception(
                    "ClientAssign or Client missing for request {$this->clientRequestId}"
                )
            );

        Log::info("SendClientBookingInfoJob: Sending email to {$clientRequest->clientAssign->client->email}");

        Mail::to($clientRequest->clientAssign->client->email)
            ->send(new ClientBookingInfoMail($clientRequest));

        Log::info("SendClientBookingInfoJob: Email sent successfully for ID {$this->clientRequestId}");
    }
}
