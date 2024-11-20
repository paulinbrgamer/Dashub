<?php

    require_once 'Database.php';
    require_once 'Querys.php';

    class App{
        private Database $db;

        public function __construct(){
            $this->db = new Database();
        }

        //metodos de autenticação
        public function register($nome, $email, $senha){
            $hash = password_hash($senha, NULL);
            $values = "('$nome', '$email', '$hash');";
            $sql = REGISTER.$values;
            try{ //tentar add no db
                $this->db->query($sql);
                return $this->login($email, $senha);
            }catch(PDOException $e){ //caso email já exista
                // echo $e->getMessage();
                return $e->getMessage();
            }
        }

        public function login($email, $senha){
            $termo = "'$email';";
            $sql = SEARCH.$termo;
            $usuario = $this->db->query($sql);
            if(password_verify($senha, $usuario['senha'])){
                return $usuario;
            } else {
                return false;
            }
        }
    }

    $app = new App();
    print_r($app->register('paulo', 'paulo.ss.loraschi@gamail.com', '123'));
?>