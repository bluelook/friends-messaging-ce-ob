<?php

include 'connectDB.php';
$ID = stripslashes(htmlspecialchars($_POST['ID']));
$PART_ID = stripslashes(htmlspecialchars($_POST['partID']));
$GENDER = stripslashes(htmlspecialchars($_POST['gender']));
$exp_type = stripslashes(htmlspecialchars($_POST['exp_type']));
$advisor_type = stripslashes(htmlspecialchars($_POST['advisor_type']));
$PART_AVATAR = stripslashes(htmlspecialchars($_POST['part_avatar']));


$stmt = $db->prepare("INSERT INTO exp_finished VALUE(?,?,?,?,?,?,NOW())");
$stmt->bind_param("ssssss", $ID, $PART_ID, $GENDER, $exp_type, $advisor_type, $PART_AVATAR);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>