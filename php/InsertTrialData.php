<?php
include 'connectDB.php';

#echo var_dump($_POST);
$ID = stripslashes(htmlspecialchars($_POST['ID']));
$PART_ID = stripslashes(htmlspecialchars($_POST['partID']));
$exp_type = stripslashes(htmlspecialchars($_POST['exp_type']));
$stimuli_type = stripslashes(htmlspecialchars($_POST['stimuli_type']));
$trial_num = stripslashes(htmlspecialchars($_POST['trial_num']));
$choice = stripslashes(htmlspecialchars($_POST['choice']));
$advisor_choice = stripslashes(htmlspecialchars($_POST['advisor_choice']));
$side = stripslashes(htmlspecialchars($_POST['side']));
$participant_reward = stripslashes(htmlspecialchars($_POST['participant_reward']));
$advisor_reward = stripslashes(htmlspecialchars($_POST['advisor_reward']));
$RT_participant = stripslashes(htmlspecialchars($_POST['RT_participant']));
$RT_advisor = stripslashes(htmlspecialchars($_POST['RT_advisor']));
$client_time = stripslashes(htmlspecialchars($_POST['client_time']));
$actor = stripslashes(htmlspecialchars($_POST['actor']));
$actor_name = stripslashes(htmlspecialchars($_POST['actor_name']));
$mood_type = stripslashes(htmlspecialchars($_POST['mood_type']));
$mood_name = stripslashes(htmlspecialchars($_POST['mood_name']));
$situation_type = stripslashes(htmlspecialchars($_POST['situation_type']));
$situation_name = stripslashes(htmlspecialchars($_POST['situation_name']));
$preferred = stripslashes(htmlspecialchars($_POST['preferred']));
$preferred_name = stripslashes(htmlspecialchars($_POST['preferred_name']));
$random_num = stripslashes(htmlspecialchars($_POST['random_num']));
$who_chosen = stripslashes(htmlspecialchars($_POST['who_chosen']));
$advisor_score = stripslashes(htmlspecialchars($_POST['advisor_score']));
$participant_score = stripslashes(htmlspecialchars($_POST['participant_score']));
$p_participant = stripslashes(htmlspecialchars($_POST['p_participant']));



if($stmt = $db->prepare("INSERT INTO exp_data VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())")){

	$stmt->bind_param("ssssssssssssssssssssssssss", $ID, $PART_ID, $exp_type, $stimuli_type, $trial_num, $choice, $advisor_choice, $side, $preferred, $preferred_name, $participant_reward, $advisor_reward, $RT_participant, $RT_advisor,  $actor, $actor_name, $mood_type, $mood_name, $situation_type, $situation_name,  $random_num, $who_chosen, $advisor_score, $participant_score, $p_participant, $client_time);
	$stmt->execute();
	
	$err = $stmt->errno;
	$data[] = array(
  		'ErrorNo' => $err);
	$stmt->close();
	$db->close();
	echo json_encode($data);
} else {
    $error = $db->errno . ' ' . $db->error;
    echo $error; // 
}

?>