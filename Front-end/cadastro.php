


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

    <script>
async function cadastrar(){
    var img = document.getElementById('load')
    img.classList.add('mostrar')
    img.classList.remove('apagar')
    var name = document.getElementById('idnome').value
    var mail = document.getElementById('idemail').value
    var password = document.getElementById('ipword').value
    const request = new URLSearchParams();
    request.append("nome", name);
    request.append("senha", password);
    request.append("email", mail);
    if (name && mail && password){
       var requisicao = await fetch("CreateUser.php",{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Define o tipo do conteúdo
        },
        body: request
    })
    img.classList.remove('mostrar')
    img.classList.add('apagar')
    if(requisicao.ok){
        var response = await requisicao.json();
        window.alert(response.message);
        if(response.message == 'EMAIL CADASTRADO COM SUCESSO!'){
            var home = document.createElement('a')
            home.href = 'index.php'
            home.click()
        }

    }
    
    }
    
    
}
    </script>
</body>
</html>