<?php
include 'connectDB.php';

$ID = stripslashes(htmlspecialchars($_POST['ID']));
$PART_ID = stripslashes(htmlspecialchars($_POST['partID']));
$Responses = stripslashes(htmlspecialchars($_POST['Responses']));


$stmt = $db->prepare("INSERT INTO survey_ptm VALUE(?,?,?,NOW())");
$stmt->bind_param("sss",$ID,$PART_ID,$Responses );
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>