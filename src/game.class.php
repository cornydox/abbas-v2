<?php
require_once "config.class.php";

class Game extends Config{
	
	function __construct(){
		parent::__construct();
	}

	function registerUser($name, $contact, $email, $score){
		$query = $this->conn->prepare("INSERT INTO users (name, contact, email, score, 
			created_at) VALUES (:name, :contact, :email, :score, NOW());");

		$query->execute(array(
			':name' => $name,
			':contact' => $contact,
			':email' => $email,
			':score' => $score,			
			));
	}

	function getLeaderboard(){
		$query = $this->conn->prepare("SELECT * FROM users WHERE `name` IS NOT NULL ORDER BY score DESC LIMIT 25;");
		$query->execute();

		$result = $query->fetchAll();

		return $result;
	}
}