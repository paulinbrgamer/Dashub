<? 

?>




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
    <div class="apagar" id="load">
        <img src="login/img/yibo-wangyibo.gif" alt="gif animado" >
    </div>
    
    <div style="display: flex;align-items: center;margin-bottom: 100px;">
        <h1 style="font-size: 28pt;margin-right:5px;color: white;">Dash</h1>
        <div style="background-color:rgb(255, 255, 255); width:60px;border-radius:4px;">
            <h1 style="color:black;font-weight:800;text-align:center;padding:5px;font-size:20pt;">Hub</h1>
        </div>
    </div>
    
    <form class="container">
        <img style="margin: auto;" src="login/img/user.png" alt="imagem de login" width="54">
        <label for="idemail">E-mail:</label>
        <input type="email" name="email" id="idemail">
        <label for="ipword">Senha:</label>
        <input type="password" name="pword" id="ipword">
        <input  type="button" value="Entrar" onclick="login()">
        <a style="width: 70px;" href="cadastro.html">Registrar</a>
    </form>

    <script >
        async function login(){
        var img = document.getElementById('load')
        img.classList.add('mostrar')
        img.classList.remove('apagar')
        var email = document.getElementById('idemail').value
        var pass = document.getElementById('ipword').value
        var res = await fetch(url+'auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Define o tipo do conteúdo
            },
            body:JSON.stringify({
                    email: email,
                    senha: pass
            })  
        })
        img.classList.remove('mostrar')
        img.classList.add('apagar')
        if(!res.ok){
            
            var body = await res.json()
            if (body.msg){
                window.alert(body.msg)
            }
        }
        else{
            var body = await res.json()    
            sessionStorage.setItem('email',body.email)
            sessionStorage.setItem('nome',body.nome)
            sessionStorage.setItem('token',body.token)
            var home = document.createElement('a')
            home.href = 'home.html'
            home.click()
            
        }
    
    
        }



    </script>
</body>
</html>