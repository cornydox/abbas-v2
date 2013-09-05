<?php

require_once "game.class.php";

$game = new Game();

$name    = $_POST["name"];
$contact = $_POST["contact"];
$email   = $_POST["email"];
$score   = $_POST["score"];
$game->registerUser($name, $contact, $email, $score);

$leaderboard = $game->getLeaderboard();

echo json_encode($leaderboard); // Return Ajax