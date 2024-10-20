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
        painelDash();
        desenharGraficos();
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
    constructor(id,tipo,elementos,dados,id_dash,nome,cores){
        this.id = id
        this.tipo = tipo
        this.elementos = elementos
        this.dados = dados
        this.id_dash = id_dash
        this.nome = nome
        this.cores = cores
    }
}
class dado{
    constructor(nome,valor,cor){
        this.nome = nome
        this.valor = valor
        this.cor = cor
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
function painelDash(){
    var telanovo = `            
    <div style="margin-left:2px; overflow:hidden; display: flex;flex-direction: column;align-items: center;" >
    <div style="display: flex;align-items: center;align-self: flex-start;">
        <button onclick="backDash()"><img src="home/img/de-volta (1).png" alt="voltar"></button>
        <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
    </div>
    <h1 class="item">Gráficos</h1>
    <div id="container-graficos">
    </div>
    <button style="font-weight: 400;font-size: 12pt;color:#ffffff;background-color: #0AC00A;padding: 8px;width: 160px;align-self: center;border-radius: 4px;margin-top: 15px;"> Adicionar Gráfico</button>
</div>
</div>`

document.querySelector('#container-home').innerHTML = telanovo
drawPainelGraphcs()

}
function backDash(){
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
}
function drawPainelGraphcs(){
    var telanovo= ''
    user.dashboard.forEach(d=>{
        if(d.id == user.dashSelected){
            d.graficos.forEach(g=>{
                if(g.tipo == 'line'){
                    telanovo += `<div class="graph">
                    <img src="home/img/icon-graph/grafico-de-linha.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
                if(g.tipo == 'bar'){
                    telanovo += `<div class="graph">
                    <img src="home/img/icon-graph/grafico-de-barras.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
                if(g.tipo == 'pizza'){
                    telanovo += `<div class="graph">
                    <img src="home/img/icon-graph/grafico-de-pizza.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
                
            })
            document.querySelector('#container-graficos').innerHTML = telanovo
        }
    })

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
        }
    }else {
        as.clicks=0
        as.clicks++
        as.botaoAmostra = nome
        aside.classList.add('abrir_dash')
    }

}
function desenharGraficos(){
    var canvas= ''
    var container = document.getElementById('Dashboard')
    user.dashboard.forEach(dash=>{
        if (dash.id == user.dashSelected){
            dash.graficos.forEach(g=>{
                canvas+= `
                <div style="background-color:#121212;padding: 10px;margin:10px; border-radius: 10px;flex-grow: 1;display:flex;align-items:center;justify-content:center;">
                <canvas id="g${g.id}"></canvas>
                </div>`
            })
            container.innerHTML = canvas
            dash.graficos.forEach(g=>{
                var dados = []
                g.elementos.forEach((e,id)=>{
                    var data = new dado(e,g.dados[id],g.cores)
                })
                if(g.tipo == 'bar'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    var myBarChart = new Chart(ctx, {
                        type: 'bar',  // Especifica o tipo de gráfico: 'bar'
                        data: {
                          labels: g.elementos, // Rótulos no eixo X
                          datasets: [{
                            label: g.nome,
                            data: g.dados,  // Dados para cada mês
                            borderWidth: 1 // Largura da borda das barras
                          }]
                        },
                        options: {
                          scales: {
                            y: {
                              beginAtZero: true  // Iniciar o eixo Y em zero
                            }
                          }
                        }
                      });
                }
            })
        }
    })
    
}
var gp = new grafico(0,'bar',['janeiro','fervereiro','março'],[100,123,90],0,'Vendas trimestrais',['green','red','blue'])
var g2 = new grafico(1,'bar',['sapato','calça','feichadura'],[10,20,30],0,'Artigos')
var g3 = new grafico(2,'pizza',null,null,0,'Mes movimentado')

var db = new dashboard('teste1',1,[gp,g2,g3],0)
var user = new usuario(0,'Paulo','123','paulogmail',[db])
var as = {botaoAmostra:'',clicks:0}

