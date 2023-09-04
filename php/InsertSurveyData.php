<?php
include 'connectDB.php';

$ID = stripslashes(htmlspecialchars($_POST['ID']));
$PART_ID = stripslashes(htmlspecialchars($_POST['partID']));
$responses = stripslashes(htmlspecialchars($_POST['responses']));

$stmt = $db->prepare("INSERT INTO survey_rating VALUE(?,?,?,NOW())");
$stmt->bind_param("sss",$ID,$PART_ID,$responses);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>