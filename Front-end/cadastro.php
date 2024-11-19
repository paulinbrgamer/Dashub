<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/style.css">
    <link rel="stylesheet" href="cadastro/cadastro.css">
    <link rel="shortcut icon" href="/login/img/user.png" type="image/png">
    <title>Registrar</title>
</head>
<body>
    <div class="apagar" id="load">
        <img src="login/img/yibo-wangyibo.gif" alt="gif animado" >
    </div>
    <div style="display: flex;align-items: center;">
        <h1 style="font-size: 28pt;margin-right:5px;color: white;">Dash</h1>
        <div style="background-color:yellow; width:60px;border-radius:4px;">
            <h1 style="color:black;font-weight:800;text-align:center;padding:5px;font-size:20pt;">Hub</h1>
        </div>
    </div>
    
    <form class="container">
        <img style="margin: auto;margin-bottom: 10px;" src="login/img/user.png" alt="imagem de login" width="54">
        <h1>Cadastrar</h1>
        <label for="idnome">Nome:</label>
        <input type="text" name="nome" id="idnome"required>
        <label for="idemail">E-mail:</label>
        <input type="email" name="email" id="idemail"required>
        <label for="ipword">Senha:</label>
        <input type="password" name="pword" id="ipword" required>
        <input onclick="cadastrar()" type="button" value="Cadastrar" required>
    </form>

    <script src="cadastro/cadastro.js"></script>
</body>
</html>