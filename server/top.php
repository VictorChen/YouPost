<?php

require_once('./db_connect.php');

$video = $_GET['video'];
$vtime = $_GET['vtime'];

$db->orderBy("likes","Desc");
$db->where('video', $video);
$db->where('likes', 0, ">");
$db->where('vtime', Array ($vtime - 5, $vtime), 'BETWEEN');

// Get top 5
$results = $db->get('posts', 5);

header('Content-Type: application/json');
echo json_encode($results);

?>