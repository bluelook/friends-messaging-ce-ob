<?php

$PART_ID = stripslashes(htmlspecialchars($_POST['partID']));

include 'connectDB.php';


$query = mysqli_query($db, "SELECT * FROM exp_finished WHERE PART_ID='".$PART_ID."'");


if(mysqli_num_rows($query) == 0)
 {
	echo('false');
 }
 else
 {
	echo('true');
 

//if (mysqli_num_rows($query) > 0) {

 //$db->close();
 //   $data[] = array(
 //     'ErrorNo' => 8,
 //  ); 

//  echo json_encode($data);
   
}?>
