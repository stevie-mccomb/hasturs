<?php

	$incomingData = json_decode(file_get_contents('php://input'));

	// Split the incoming data into the proper variables:
	$name = strip_tags($incomingData->name);
	$email = strip_tags($incomingData->email);
	$phone = strip_tags($incomingData->phone);
	$rawMessage = strip_tags($incomingData->message);

	// Fill in the PHP mail function variables:
	$to = 'hasturshobbies@gmail.com';
	$subject = 'Customer Inquiry';
	$headers = array();
		$headers[] = 'To: Hastur <hasturshobbies@gmail.com>';
		$headers[] = 'From: '.$name.' <'.$email.'>';
		$headers[] = 'Reply-To: '.$name.' <'.$email.'>';
		$headers[] = 'MIME-Version: 1.0';
		$headers[] = 'Content-type: text/html; charset=iso-8859-1';

	// Format the message for sending:
	$message = '
		<html>
		<body>
			<table>
				<tr><th>Name:</th><td>'.$name.'</td></tr>
				<tr><th>Email:</th><td>'.$email.'</td></tr>
				<tr><th>Phone:</th><td>'.$phone.'</td></tr>
				<tr><th>Message:<br /><br /></th><td>'.$rawMessage.'</td></tr>
			</table>
		</body>
		</html>
	';

	// Send
	if (mail($to, $subject, $message, implode("\r\n", $headers))) { echo json_encode(true); } else { echo json_encode(false); }


?>