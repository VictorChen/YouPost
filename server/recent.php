<?php

require_once('./db_connect.php');

$video = $_GET['video'];
$vtime = $_GET['vtime'];

$db->where('video', $video);
$db->where('vtime', Array ($vtime - 5, $vtime), 'BETWEEN');

$results = $db->get('posts');

header('Content-Type: application/json');
echo json_encode($results);

?>