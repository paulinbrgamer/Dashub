 var token;
var url = 'https://api-dashub-dev.up.railway.app/'
async function login(){
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
    if(res){
        
        var body = await res.json()
        if (body.erro){
            window.alert(body.erro)
        }
        else{
            
            
        }
    }
    
    
}


