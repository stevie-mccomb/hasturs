<?php

	require 'idiorm.php';
	require 'db-connection.php';

	$eventsData = ORM::for_table('events')->find_many();
	$events = Array();
	foreach($eventsData as $eventData) {
		$event = new stdClass();
		$event->name = $eventData->name;
		$event->time = $eventData->time;
		$event->image = $eventData->image;
		$event->description = utf8_encode($eventData->description);
		array_push($events, $event);
	}
	echo json_encode($events);

?>