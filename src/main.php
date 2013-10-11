<?php

require_once "game.class.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
	$game = new Game();
	$action = $_POST['action'];
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


