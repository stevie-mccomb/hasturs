<?php

	require 'idiorm.php';
	require 'db-connection.php';

	$featured = file_get_contents('php://input');

	if ($featured) {
		$eventsData = ORM::for_table('events')->where('featured', 1)->find_many();
	} else {
		$eventsData = ORM::for_table('events')->find_many();
	}
	$events = Array();
	foreach($eventsData as $eventData) {
		$event = new stdClass();
		$event->name = $eventData->name;
		$event->time = $eventData->time;
		$event->image = $eventData->image;
		$event->description = utf8_encode($eventData->description);
		$event->anchor = $eventData->anchor;
		array_push($events, $event);
	}
	echo json_encode($events);

?>