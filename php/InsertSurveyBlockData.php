<?php
include 'connectDB.php';

$ID = stripslashes(htmlspecialchars($_POST['ID']));
$PART_ID = stripslashes(htmlspecialchars($_POST['partID']));
$RATING = stripslashes(htmlspecialchars($_POST['rating']));
$BLOCK_NAME = stripslashes(htmlspecialchars($_POST['block_name']));


$stmt = $db->prepare("INSERT INTO survey_block VALUE(?,?,?,?,NOW())");
$stmt->bind_param("ssss",$ID,$PART_ID,$RATING, $BLOCK_NAME);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>