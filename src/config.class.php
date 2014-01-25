<?php
class Config{
	private $host     = "127.0.0.1";
	private $dbname   = "inventio_game";

	## Development
	private $username = "root";
	private $password = "123456";

	## LIVE
	// private $username = "inventio_root";
	// private $password = "inventions123";

	public $conn = "";

	function __construct(){
		$this->connectDb();
	}

	function connectDb(){
		try{
			$this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8",
				$this->username, $this->password);
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch(PDOException $e){
			echo "ERROR: " . $e->getMessage();
		}
	}
}

