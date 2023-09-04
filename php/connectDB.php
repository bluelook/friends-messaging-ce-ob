<?php

$host="localhost";
#$user="root";
#$password="";
$db = "friends_messaging_ce_ob";
$user="wampuser";
$password="RZ23rdg/c9%!WLw";

$db = new mysqli($host, $user, $password, $db,"3308");

if (mysqli_connect_errno()) {
   printf("DB error: %s", mysqli_connect_error());
   exit();
}
#echo "Connected successfully";
?>