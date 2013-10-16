<?php

require_once "game.class.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
	$action = $_POST['action'];
}
else if($_SERVER["REQUEST_METHOD"] === "GET"){
	$action = $_GET['action'];
}

if(isset($action)){
	$game = new Game();
	call_user_func($action, $game);
}

function register($game){
	$name    = $_POST["name"];
	$contact = $_POST["contact"];
	$email   = $_POST["email"];
	$score   = $_POST["score"];
	$game->registerUser($name, $contact, $email, $score);

	getLeaderboard($game);
}

function getLeaderboard($game){
	$leaderboard = $game->getLeaderboard();
	echo json_encode($leaderboard); // Return Ajax
}

function getAdminData($game){
	$data = $game->getAdminData();
	echo json_encode($data);
}

function exportAdminData($game){
	$date = date("Y-m-d");
	header("Content-type: text/csv");
	header("Content-Disposition: attachment; filename=abbas_{$date}.csv");
	header("Pragma: no-cache");
	header("Expires: 0");

	echo "id,name,contact,email,score,date\n";
	$data = $game->getAdminData();
	foreach($data as $row){
		echo "{$row['id']},{$row['name']},{$row['contact']},{$row['email']},{$row['score']},{$row['created_at']}\n";
	}


}


