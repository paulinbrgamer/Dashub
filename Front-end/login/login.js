var url = 'https://api-dashub-dev.up.railway.app/'
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


