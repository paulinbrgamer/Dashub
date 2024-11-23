<?php
    session_start();
    include 'php/app.php';
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $respo =  $app->register(
             htmlspecialchars($_POST["nome"]), 
             htmlspecialchars($_POST["email"]), 
             htmlspecialchars($_POST["senha"])
            );
        if ($respo == '23000'){
            header('Content-Type: application/json');
            echo json_encode(["status" => "error",
            "message" => "EMAIL JÁ EM USO"]);
        }else{
            header('Content-Type: application/json');
            echo json_encode(["status" => "allright",
            "message" => "EMAIL CADASTRADO COM SUCESSO!"]);
            
        }
        
    }
?>