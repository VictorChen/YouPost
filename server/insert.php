<?php

require_once('./db_connect.php');

$data = array(
  'email' => htmlentities($_POST['email']),
  'content' => htmlentities($_POST['content']),
  'video' => htmlentities($_POST['video']),
  'vtime' => htmlentities($_POST['vtime'])
);

$id = $db->insert('posts', $data);

if ($id) {
  $arr = array('success' => 1);
} else {
  $arr = array('success' => 0);
}

header('Content-Type: application/json');
echo json_encode($arr);

?>