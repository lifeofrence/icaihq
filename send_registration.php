<?php
/**
 * ICAI Global Trade Fair 2026 — Registration Email Router
 *
 * Routes submitted registration forms to the correct department email
 * based on the registration_type field:
 *
 *   sponsor      → sponsorship@icaihq.com
 *   speaker      → delegations@icaihq.com
 *   exhibitor    → exhibition@icaihq.com
 *   participant  → registration@icaihq.com
 */

// ── Allow only POST requests ──────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ── Load PHPMailer ────────────────────────────────────────────────────────
require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';
require_once __DIR__ . '/config_smtp.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ── Helper: sanitize input ────────────────────────────────────────────────
function clean($value) {
    return htmlspecialchars(strip_tags(trim($value ?? '')), ENT_QUOTES, 'UTF-8');
}

// ── Routing map ──────────────────────────────────────────────────────────
$routingMap = [
    'sponsor'     => ['email' => 'sponsorship@icaihq.com',  'label' => 'Sponsorship'],
    'speaker'     => ['email' => 'delegations@icaihq.com',  'label' => 'Speaker Delegation'],
    'exhibitor'   => ['email' => 'exhibition@icaihq.com',   'label' => 'Exhibition'],
    'participant' => ['email' => 'registration@icaihq.com', 'label' => 'General Registration'],
];

// ── Validate registration type ───────────────────────────────────────────
$registrationType = clean($_POST['registration_type'] ?? '');

if (!array_key_exists($registrationType, $routingMap)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid registration type.']);
    exit;
}

$route = $routingMap[$registrationType];

// ── Collect & sanitize all form fields ───────────────────────────────────
$fields = [];
foreach ($_POST as $key => $value) {
    if ($key !== 'registration_type') {
        $fields[clean($key)] = clean($value);
    }
}

// ── Determine sender name/email for reply-to ─────────────────────────────
$replyToEmail = $fields['email'] ?? '';
$replyToName  = $fields['full_name'] ?? ($fields['contact_person'] ?? 'Applicant');

// ── Build HTML email body ─────────────────────────────────────────────────
$fieldLabels = [
    'company_name'       => 'Company Name',
    'company_address'    => 'Company Address',
    'contact_person'     => 'Contact Person',
    'full_name'          => 'Full Name',
    'job_title'          => 'Job Title',
    'email'              => 'Email Address',
    'phone'              => 'Phone Number',
    'organization'       => 'Company / Organization',
    'presentation_topic' => 'Topic / Theme of Presentation',
    'abstract'           => 'Abstract / Summary',
    'sponsorship_package'=> 'Sponsorship Package',
    'stall_size'         => 'Stall Size Required',
    'products_services'  => 'Products / Services',
    'country'            => 'Country',
    'area_of_interest'   => 'Area of Interest',
    'message'            => 'Additional Message / Requirements',
];

$tableRows = '';
foreach ($fields as $key => $value) {
    if ($value === '') continue;
    $label = $fieldLabels[$key] ?? ucwords(str_replace('_', ' ', $key));
    $tableRows .= "
        <tr>
            <td style='padding:10px 14px; background:#f8f8f8; font-weight:600; color:#333; width:35%; border-bottom:1px solid #e0e0e0;'>{$label}</td>
            <td style='padding:10px 14px; color:#555; border-bottom:1px solid #e0e0e0;'>" . nl2br($value) . "</td>
        </tr>";
}

$submittedAt = date('D, d M Y H:i:s T');
$htmlBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;font-family:Inter,Arial,sans-serif;background:#f0f0f0;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f0f0f0;padding:30px 0;'>
    <tr><td align='center'>
      <table width='620' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);'>
        <!-- Header -->
        <tr>
          <td style='background:linear-gradient(135deg,#e62129,#b01018);padding:36px 40px;text-align:center;'>
            <h1 style='color:#fff;margin:0;font-size:22px;font-weight:700;letter-spacing:0.5px;'>
              New {$route['label']} Application
            </h1>
            <p style='color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;'>ICAI Global Trade Fair 2026</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style='padding:36px 40px;'>
            <p style='color:#333;font-size:15px;margin:0 0 24px;'>
              A new <strong>{$route['label']}</strong> registration has been submitted. Details are below:
            </p>
            <table width='100%' cellpadding='0' cellspacing='0' style='border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;font-size:14px;'>
              {$tableRows}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style='background:#f8f8f8;padding:20px 40px;border-top:1px solid #e0e0e0;text-align:center;'>
            <p style='color:#999;font-size:12px;margin:0;'>Submitted: {$submittedAt}</p>
            <p style='color:#999;font-size:12px;margin:6px 0 0;'>ICAI Global Trade Fair 2026 &mdash; <a href='https://icaihq.com' style='color:#e62129;text-decoration:none;'>icaihq.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>";

// ── Build plain-text fallback ─────────────────────────────────────────────
$textBody = "New {$route['label']} Registration — ICAI Global Trade Fair 2026\n";
$textBody .= str_repeat('=', 60) . "\n\n";
foreach ($fields as $key => $value) {
    if ($value === '') continue;
    $label = $fieldLabels[$key] ?? ucwords(str_replace('_', ' ', $key));
    $textBody .= "{$label}: {$value}\n";
}
$textBody .= "\nSubmitted: {$submittedAt}\n";

// ── Send email ────────────────────────────────────────────────────────────
$mail = new PHPMailer(true);

try {
    setupSMTP($mail);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';

    // Recipient — routed by registration type
    $mail->addAddress($route['email'], 'ICAI ' . $route['label'] . ' Team');

    // Reply-to the applicant so the team can respond directly
    if (filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($replyToEmail, $replyToName);
    }

    $mail->Subject = '[ICAI 2026] New ' . $route['label'] . ' Registration — ' . $replyToName;
    $mail->Body    = $htmlBody;
    $mail->AltBody = $textBody;

    $mail->send();

    // ── Auto-acknowledgement to the applicant ─────────────────────────
    if (filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
        $ackMail = new PHPMailer(true);
        setupSMTP($ackMail);
        $ackMail->isHTML(true);
        $ackMail->CharSet = 'UTF-8';
        $ackMail->addAddress($replyToEmail, $replyToName);
        $ackMail->Subject = 'ICAI 2026 — We received your ' . $route['label'] . ' application';
        $ackMail->Body = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;font-family:Inter,Arial,sans-serif;background:#f0f0f0;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f0f0f0;padding:30px 0;'>
    <tr><td align='center'>
      <table width='620' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);'>
        <tr>
          <td style='background:linear-gradient(135deg,#e62129,#b01018);padding:36px 40px;text-align:center;'>
            <h1 style='color:#fff;margin:0;font-size:22px;font-weight:700;'>Application Received!</h1>
            <p style='color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;'>ICAI Global Trade Fair 2026</p>
          </td>
        </tr>
        <tr>
          <td style='padding:36px 40px;'>
            <p style='color:#333;font-size:15px;line-height:1.7;'>Dear <strong>" . htmlspecialchars($replyToName) . "</strong>,</p>
            <p style='color:#555;font-size:15px;line-height:1.7;'>
              Thank you for submitting your <strong>{$route['label']}</strong> application for the ICAI Global Trade Fair 2026.
              We have received your details and our team will review your application and get back to you shortly.
            </p>
            <p style='color:#555;font-size:15px;line-height:1.7;'>
              If you have any urgent queries, please reach us at 
              <a href='mailto:{$route['email']}' style='color:#e62129;'>{$route['email']}</a> 
              or call <strong>+234 (0) 803 464 4036</strong>.
            </p>
            <p style='color:#555;font-size:15px;line-height:1.7;margin-top:24px;'>
              Warm regards,<br>
              <strong>The ICAI 2026 Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style='background:#f8f8f8;padding:20px 40px;border-top:1px solid #e0e0e0;text-align:center;'>
            <p style='color:#999;font-size:12px;margin:0;'>ICAI Global Trade Fair 2026 &mdash; <a href='https://icaihq.com' style='color:#e62129;text-decoration:none;'>icaihq.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>";
        $ackMail->AltBody = "Dear {$replyToName},\n\nThank you for your {$route['label']} application for ICAI Global Trade Fair 2026. We will be in touch shortly.\n\nWarm regards,\nThe ICAI 2026 Team";
        $ackMail->send();
    }

    echo json_encode([
        'success' => true,
        'message' => 'Your application has been submitted successfully! Please check your inbox for a confirmation email.'
    ]);

} catch (Exception $e) {
    error_log('ICAI Registration mailer error: ' . $mail->ErrorInfo);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send your application. Please try again or contact us directly at ' . $route['email']
    ]);
}
