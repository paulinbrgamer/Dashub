<?php

    require_once 'Database.php';
    require_once 'Querys.php';

    class App{
        private Database $database;

        public function __construct(){
            $this->database = new Database();
        }

        //metodos de autenticação
        public function register($nome, $email, $senha){
            $hash = password_hash($senha, NULL);
            $values = "('$nome', '$email', '$hash');";
            $sql = REGISTER.$values;
            try{ //tentar add no db
                $this->database->query($sql);
            }catch(PDOException $e){ //caso email já exista
                // echo $e->getMessage();
                return $e->getMessage();
            }
        }
    }

    $app = new App();
    echo $app->register('paulo', 'paulo.ss.loraschi@gmail.com', '123');
?>