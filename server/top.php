<?php

require_once('./db_connect.php');

$email = htmlentities($_GET['email']);
$video = $_GET['video'];
$vtime = $_GET['vtime'];

$db->where('video', $video);
$db->where('likes', 0, ">");
$db->where('vtime', Array($vtime - 5, $vtime), 'BETWEEN');

$likes = $db->subQuery('l');
$likes->groupBy('postid');
$likes->get('likes', null, 'postid as id, sum(liked) as likes');

$myLikes = $db->subQuery('m');
$myLikes->where('email', $email);
$myLikes->get('likes', null, 'postid as id, liked as myLikes');

$db->join($likes, 'p.id=l.id', 'LEFT');
$db->join($myLikes, 'p.id=m.id', 'LEFT');
$db->orderBy("likes", "Desc");
$results = $db->get('posts p', 5, 'p.id, p.email, p.content, p.video, p.vtime, p.timestamp, l.likes, m.myLikes');

header('Content-Type: application/json');
echo json_encode($results);

?>