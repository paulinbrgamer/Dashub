class usuario{
    constructor(id,nome,senha,email,dashboard){
        this.id = id
        this.nome = nome
        this.senha = senha
        this.email = email
        this.dashboard = dashboard
        this.ndash = 0
        this.dashSelected = null
    }
    adicionarDashboard(){
        var iName = document.getElementById('name_dashboard')
        if(typeof iName.value === 'string' && iName.value.trim().length > 0){
            var novoDash = new dashboard(iName.value,this.ndash,[],this.id)
            this.ndash++
            this.dashboard.push(novoDash)
            iName.value = ''
            
        }
        else{
            window.alert("Digite um nome valido") 
        }
    }
    removerDashboard(event,id){
        event.stopPropagation();
        this.dashboard.forEach((element,idx) => {
            if (element.id == id){
                this.dashboard.splice(idx,1)
            }
        });
        this.ndash--
        drawnDash()
    }
    selecionarDash(idx){
        this.dashSelected = idx
        
    }
}
class dashboard{
    constructor(nome,id,graficos,id_user){
        this.id = id
        this.nome = nome
        this.graficos = graficos
        this.id_user = id_user
    }
}
class grafico{
    constructor(id,tipo,elementos,dados,id_dash){
        this.id = id
        this.tipo = tipo
        this.elementos = elementos
        this.dados = dados
        this.id_dash = id_dash
    }
}

function drawnDash(){
    var dashs = ''
    user.dashboard.forEach(d => {
        dashs += `
        <div id = "${d.id}" class="dashboard" onclick = "user.selecionarDash(${d.id})">
        <h3>${d.nome}</h3>
        <button onclick="user.removerDashboard(event,${d.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
        </div>
        `
    });
    document.getElementById('container-Dashboards').innerHTML = dashs
}
function abrirUser(){
    var telanovo = 
    `
    <div style="margin-left:2px; overflow:hidden;display:flex;flex-direction:column;align-itens:center;" >
    <h1 class="item">Usuario</h1>
    <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
        <h5 style="color:rgb(196, 193, 193);" for="name_dashboard">Nome: </h5>
        <h5 style="color:#0AC00A;">Paulo francisco</h5>
        
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
        <h5 style="color:rgb(196, 193, 193);" for="name_dashboard">Email: </h5>
        <h5 style="color:#0AC00A;">Pauloferadosgames@gmail.com</h5>
        
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
        <h5 style="color:rgb(196, 193, 193);" for="name_dashboard">Senha: </h5>
        <h5 style="color:#0AC00A;">Paulofera</h5>
        
    </div>
    <button style="background-color: transparent;color: red;font-weight: 800;margin-top:30px;">Sair</button>
    </div
    `
    document.querySelector('#container-home').innerHTML = telanovo
    abrirAside('user')
}
function abrirDash(){
    var teladash =
    `<div id="menudashboard">
    
    <div style="display: flex;flex-direction: column;flex: 1;overflow: scroll;">
        <h1 class="item">Dashboards</h1>
        <div id="container-Dashboards">


        </div>
        
    </div>
</div>`
    document.querySelector('#container-home').innerHTML = teladash
    drawnDash()
    abrirAside('dashs')
}
function abrirNovo(){
    var telanovo = `
    <div style="margin-left:2px; overflow:hidden;" >
        <h1 class="item">Criar Dashboard</h1>
        <h5 style="color:rgb(196, 193, 193);margin-top:20px;" for="name_dashboard">Nome </h5>
        <div style="display:flex; justify-content:center;margin-top:4px;">
        <input type="text" id="name_dashboard" placeholder="Digite o nome">
        <button onclick="user.adicionarDashboard()" id="addDash">Adicionar</button>
        </div>
    </div>`
    document.querySelector('#container-home').innerHTML = telanovo
    abrirAside('add')
}

function abrirAside(nome){
    var aside = document.querySelector('aside')
    if (as.botaoAmostra== nome){
        as.clicks++
        if(as.clicks<3){
            aside.classList.toggle('abrir_dash')
            as.clicks=0
            as.botaoAmostra=''
            console.log(as)
        }
    }else {
        as.clicks=0
        as.clicks++
        as.botaoAmostra = nome
        aside.classList.add('abrir_dash')
        console.log(as)
    }

}
var user = new usuario(0,'Paulo','123','paulogmail',[])
var as = {botaoAmostra:'',clicks:0}

abrirAside('user')