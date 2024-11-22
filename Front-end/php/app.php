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
            $sql = GETUSER.$termo;
            $usuario = $this->db->query($sql);
            if(password_verify($senha, $usuario['senha'])){
                return $usuario;
            } else {
                return false;
            }
        }

        //metodos para pegar Dashboards e tabelas
        public function getData($graficoId){
            $termo = "'$graficoId';";
            $sql =  $this->db->conn->prepare(GETDATAG . $termo);
            $sql->execute();
            $usuario = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $usuario;
        }

        public function getGraphFor($id_dash){
            $termo = "'$id_dash';";
            $sql =  $this->db->conn->prepare(GETGRAPH . $termo);
            $sql->execute();
            $usuario = $sql->fetchAll(PDO::FETCH_ASSOC);
            return $usuario;
        }

        public function getAllDash($id_user){
            $termo = "'$id_user';";
            $sql =  $this->db->conn->prepare(GETDASHbyUSER . $termo);
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach ($data as &$dashs){
                $id = $dashs["id"];
                $graficos = $this->getGraphFor($id);
                foreach($graficos as &$graph){
                    $refe = $this->getData($graph["id"]);
                    $graph["elementos"] = [];
                    $graph["dados"] = [];
                    $graph["cores"] = [];
                    foreach($refe as &$values){
                        array_push($graph["elementos"],$values["nome"]);
                        array_push($graph["dados"],$values["valor"]);
                        array_push($graph["cores"],$values["cor"]);
                    }
                    
                }
                $dashs["graficos"] = $graficos;
            }
            
            return $data;
        }

        //metodos Dashs
        public function createDash($nome, $id_user){
            $termo = "('$nome', '$id_user');";
            $sql = CREATEDASH.$termo;
            $this->db->query($sql);
        }

        public function deleteDash($id_dash, $id_user){
            $sql = GETDASHbyID.$id_dash;
            $data = $this->db->query($sql);
            if($data['id_user'] === $id_user){
                $this->db->query(DELETEDASH."$id_dash;");
                return true;
            } else {
                return false;
            }
        }
    }

    $app = new App();

?>