<?php

require_once('./db_connect.php');
header('Content-Type: application/json');

$email = htmlentities($_POST['email']);
$postid = $_POST['postid'];
$liked = $_POST['liked']; // 1, -1, 0

// Must be a number!
if ($liked != 0 && $liked != 1 && $liked != -1) {
  $arr = array('error' => 'invalid "liked" value');
  echo json_encode($arr);
  return;
}

// Neutral, delete it from likes table
if ($liked == 0) {
  $db->where('email', $email);
  $db->where('postid', $postid);
  if ($db->delete('likes')) {
    $arr = array('success' => 1);
    echo json_encode($arr);
    return;
  }
}

$data = array(
  'email' => $email,
  'postid' => $postid,
  'liked' => $liked
);

$id = $db->replace('likes', $data);

if ($id) {
  $arr = array('success' => 1, 'replaced' => 1);
} else {
  $arr = array('success' => 0);
}

echo json_encode($arr);

?>