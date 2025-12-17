<!-- <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 20px;">
          
                <h2 style="color: #333333; margin-bottom: 10px;">Hello {{ $request->clientAssign->client->firstname }} {{ $request->clientAssign->client->lastname }},</h2>
                <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
                    This is the confirmation of your booking.
                </p>

              
                <h3 style="color: #333333; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; margin-bottom: 15px;">Booking Details</h3>
                <p style="font-size: 16px; color: #555555; margin: 5px 0;">
                    <strong>Reference Number:</strong> {{ $request->reference_number }}
                </p>
                <p style="font-size: 16px; color: #555555; margin: 5px 0;">
                    <strong>Schedule:</strong> 
                    {{ \Carbon\Carbon::parse($request->clientAssign->appointment->effective_date)->format('F j, Y') }} 
                    at 
                    {{ \Carbon\Carbon::parse($request->clientAssign->appointment->time)->format('h:i A') }}
                </p>
                <p style="font-size: 16px; color: #555555; margin: 5px 0;">
                    <strong>Location:</strong> {{ $request->clientAssign->appointment->user->address }}
                </p>

                <p style="font-size: 16px; color: #555555; margin-top: 30px;">
                    Thank you for your booking! We look forward to seeing you.
                </p>
                <p style="font-size: 14px; color: #999999; margin-top: 20px; border-top: 1px solid #eeeeee; padding-top: 10px;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </td>
        </tr>
    </table>
</body>
</html> -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .content {
            padding: 30px 25px;
        }

        h2 {
            color: #333333;
            margin-bottom: 15px;
            font-size: 22px;
        }

        p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
            margin: 10px 0;
        }

        h3 {
            color: #333333;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 5px;
            margin: 20px 0 15px;
            font-size: 18px;
        }

        .highlight {
            background-color: #f1f8e9;
            border-left: 4px solid #4CAF50;
            padding: 10px;
            margin: 15px 0;
            font-weight: bold;
        }

        .footer {
            font-size: 14px;
            color: #999999;
            border-top: 1px solid #eeeeee;
            padding-top: 15px;
            margin-top: 30px;
        }

        @media only screen and (max-width: 620px) {
            .content {
                padding: 20px 15px;
            }

            h2 {
                font-size: 20px;
            }

            h3 {
                font-size: 16px;
            }

            p {
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <!-- Greeting -->
            <h2>Hello {{ $request->clientAssign->client->firstname }} {{ $request->clientAssign->client->lastname }},</h2>
            <p>This is the confirmation of your booking.</p>

            <!-- Booking Details -->
            <h3>Booking Details</h3>
            <p><strong>Reference Number:</strong> {{ $request->reference_number }}</p>
            <p><strong>Schedule:</strong> 
                {{ \Carbon\Carbon::parse($request->clientAssign->appointment->effective_date)->format('F j, Y') }} 
                at 
                {{ \Carbon\Carbon::parse($request->clientAssign->appointment->time)->format('h:i A') }}
            </p>
            <p><strong>Location:</strong> {{ $request->clientAssign->appointment->user->address }}</p>

            <!-- Important Note -->
            <div class="highlight">
                Kindly be informed that this appointment will be held at our company office. 
                We look forward to discussing your project in detail.

                @if(strtolower($request->servicesOffer->title) !== 'other services')
                    {{ $request->servicesOffer->title }} of {{ $request->subCategory->title }} plan.
                @else
                    including house, apartment, building construction, or road renovation plans.
                @endif
                
                Please ensure you arrive on time so we can provide you with the best possible service and guidance.
            </div>

            <!-- Footer Message -->
            <p>Thank you for your booking! We look forward to seeing you.</p>
            <p class="footer">This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
