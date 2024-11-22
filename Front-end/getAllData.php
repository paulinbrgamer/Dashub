<?php
session_start();
    include 'php/app.php';
if($_SERVER["REQUEST_METHOD"]=== "GET"){
    header('Content-Type: application/json');
    echo json_encode($app->getAllDash($_SESSION["id"]));
}?>