<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $description = $_POST["description"];

    $to = "Sultan.Ahmad.Asif@gmail.com";
    $message = "Name: $name\nEmail: $email\nSubject: $subject\nDescription: $description";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
} else {
    http_response_code(405);
}
?>
