var token;
async function login(){
    var img = document.getElementById('load')
    img.classList.add('mostrar')
    img.classList.remove('apagar')
    var email = document.getElementById('idemail').value
    var pass = document.getElementById('ipword').value
    var res = await fetch('https://api-to-do-a5kr.onrender.com/login',{
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
    if(res){
        
        var body = await res.json()
        if (body.erro){
            window.alert(body.erro)
        }
        else{
            var a = document.createElement('a')
            a.href = 'home.html'
            token = body.token
            localStorage.setItem('tk',token)
            
            a.click()
        }
    }
    
    
}


