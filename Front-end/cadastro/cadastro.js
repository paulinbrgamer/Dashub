var token;
var url = 'https://api-dashub-dev.up.railway.app/'
async function cadastrar(){
    var name = document.getElementById('idnome').value
    var mail = document.getElementById('idemail').value
    var password = document.getElementById('ipword').value
    var requisicao = await fetch(url+'auth/register',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json', // Define o tipo do conteúdo
        },
        body: JSON.stringify({nome:name,email:mail,senha:password})
    })
    if(requisicao.ok){
    }
    else{
        var b= await requisicao.json()
        window.alert(b.erro)
    }
}