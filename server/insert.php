<?php

require_once('./db_connect.php');

// Fake data
$data = Array(
  'email' => 'itsvicc@gmail.com',
  'content' => htmlentities('<script>alert("test");</script>'),
  'video' => 'i5ZM0-f5_CU',
  'vtime' => 122
);

$id = $db->insert('posts', $data);

if ($id) {
  echo 'Post was submitted. Id=' . $id;
}

?>