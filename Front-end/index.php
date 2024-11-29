



<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/style.css">
    <link rel="stylesheet" href="login/login.css">
    <link rel="shortcut icon" href="/login/img/user.png" type="image/png">
    <title>Login</title>
</head>
<body>

<?php
    session_start();
    
    // Verifica se o formulário foi enviado
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Captura os dados enviados pelo formulário
        $senha = htmlspecialchars($_POST['pword']);
        $email = htmlspecialchars($_POST['email']);
        if($app->login( $email, $senha)){
            $query = $app->login( $email, $senha);
            $nome = $query["nome"];
            $id = $query["id"];

            $_SESSION['id'] = $id;
            $_SESSION['name'] = $nome;
            $_SESSION['email'] = $email;
        header("Location: home.php");
        exit;
        }
        else{
            echo "<script>window.alert('CREDENCIAIS ERRADAS, TENTE NOVAMENTE!')</script>";
        }
        
    }
    ?>
    
   <img id="apresentation" src="login/img/login-img.gif" alt="imagem">
    <form class="container" method="post" action="">
    <div style="display: flex;align-items: center;margin-bottom: 10px; align-self:center;">
        <h1 style="font-size: 28pt;margin-right:5px;color: white;">Dash</h1>
        <div style="background-color:rgb(255, 255, 255); width:60px;border-radius:4px;">
            <h1 style="color:black;font-weight:800;text-align:center;padding:5px;font-size:20pt;">Hub</h1>
        </div>
    </div>
    
        <img style="margin: auto;margin-bottom: 30px;" src="login/img/user.png" alt="imagem de login" width="54">
        <label for="idemail">E-mail:</label>
        <input type="email" name="email" id="idemail">
        <label for="ipword">Senha:</label>
        <input type="password" name="pword" id="ipword">
        <input  type="submit" value="Entrar" onclick="login()">
        <a style="width: 70px;" href="cadastro.php">Registrar</a>
    </form> 
</body>
</html>