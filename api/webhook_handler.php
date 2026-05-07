<?php
/**
 * ZAWADI MANGA - PHP Webhook
 * This script listens for a webhook from an AppSheet 'Automation Bot' 
 * to trigger a chapter download or processing task.
 */

header('Content-Type: application/json');

// 1. Log the incoming request for debugging
$raw_body = file_get_contents('php://input');
$data = json_decode($raw_body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
    exit;
}

// 2. Validate a shared secret / token (Optional but recommended)
// $token = $_SERVER['HTTP_X_APPSHEET_TOKEN'] ?? '';
// if ($token !== 'YOUR_APP_SECRET') { ... }

// 3. Process the automation signal
$mangaTitle = $data['title'] ?? 'Unknown';
$chapterNum = $data['chapter_number'] ?? 0;

// Log action (In a real app, this might start a background downloader)
error_log("AppSheet Trigger: Starting download for $mangaTitle Ch $chapterNum");

// 4. Respond to AppSheet
echo json_encode([
    "status" => "success",
    "manga" => $mangaTitle,
    "chapter" => $chapterNum,
    "message" => "Processing task started"
]);
?>
