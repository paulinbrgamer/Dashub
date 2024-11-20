<?php

    require_once 'vendor/autoload.php';

    $dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__);
    $dotenv->load();

    class Database{
        private string $host;
        private string $dbname;
        private string $username;
        private string $password;

        private PDO $conn;

        public function __construct(){
            $this->host = getenv('HOST');
            $this->dbname = getenv('DBNAME');
            $this->username = getenv('USER');
            $this->password = getenv('PASSWORD');
            
            $this->connect();
        }

        private function connect(){
            try{
                $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                echo "Conseguii\n"; 
            } catch (PDOException $e) {
                echo "Erro de conexão: ".$e->getMessage();
            }
        }

        
    }

    $papa = new Database();
?>