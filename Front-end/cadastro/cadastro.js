var url = 'https://api-dashub-dev.up.railway.app/'
async function cadastrar(){
    var img = document.getElementById('load')
    img.classList.add('mostrar')
    img.classList.remove('apagar')
    var name = document.getElementById('idnome').value
    var mail = document.getElementById('idemail').value
    var password = document.getElementById('ipword').value
    if (name && mail && password){
       var requisicao = await fetch(url+'auth/register',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json', // Define o tipo do conteúdo
        },
        body: JSON.stringify({nome:name,email:mail,senha:password})
    })
    img.classList.remove('mostrar')
    img.classList.add('apagar')
    if(!requisicao.ok){
        
        var body = await requisicao.json()
        if (body.msg){
            window.alert(body.msg)
        }
    }
    else{
        var body = await requisicao.json() 
        if (body.msg){
            window.alert(body.msg)
        }   
        localStorage.setItem('email',body.email)
        localStorage.setItem('nome',body.nome)
        localStorage.setItem('token',body.token)
        var home = document.createElement('a')
        home.href = 'home.html'
        home.click()
        
    } 
    }
    else{
        window.alert("Voce deve preencher todos os campos")
    }
    
}