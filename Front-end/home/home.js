//classe usuário que contem seus atributos e metodos
class usuario{
    constructor(id,nome,senha,email,dashboard){
        this.id = id
        this.nome = nome
        this.senha = senha
        this.email = email
        this.dashboard = dashboard
        this.ndash = 0
        this.ngraf = 0
        this.dashSelected = null
    }
    //metodo que adiciona um dashboard no atributo dashboar do usuário
    adicionarDashboard(){
        //obtem o nome do novo dashboard 
        var iName = document.getElementById('name_dashboard')
        //verifica se o nome é valido
        if(typeof iName.value === 'string' && iName.value.trim().length > 0){
            //cria o objeto  dashboard 
            var novoDash = new dashboard(iName.value,this.ndash,[],this.id)
            //adiciona no objeto user 
            this.dashboard.push(novoDash)
            //seleciona esse novo dashboard
            this.selecionarDash(this.ndash)
            //incrementa o numero de dashboards
            this.ndash++
            
            iName.value = ''
            
            
        }
        else{
            window.alert("Digite um nome valido") 
        }
    }
    //remover um dashboard
    removerDashboard(event,id){
        event.stopPropagation();
        //percorrer todos os dashboards do usuario
        this.dashboard.forEach((element,idx) => {
            //encontrar o dashboard selecionado para deletar pelo ID do mesmo
            if (element.id == id){
                //verifica se o que está sendo deletado está em exibição, se sim apaga a exibição dele
                if (element.id == user.dashSelected){
                    document.getElementById('titled').innerHTML = ''
                
                    defaltmain()
                }
                //remove o dashboard do atributo dashboard do objeto user
                this.dashboard.splice(idx,1)
            }
        });
        this.ndash--
        drawnDash()
        
    }
    //metodo que seleciona um dashboard por id
    selecionarDash(idx){
        //verifica se o dashboard selecionado já esta em exibição, se não estiver chama a função para desenhar os graficos do dashboard
        if (this.dashSelected == idx){
            painelDash();
        }
        else{
            this.dashSelected = idx
            painelDash();
            desenharGraficos();  
        }
        //adiciona o titulo do dashboard
        var d_title = document.getElementById('titled')
        this.dashboard.forEach(d=>{
            if (d.id == this.dashSelected){
                d_title.innerHTML = d.nome
            }
        })
        
    }
    //remover grafico
    removeGraph(event,id){
        event.stopPropagation();
        //encontrar o dashboard que está o grafico que foi selecionado para deletar
        this.dashboard.forEach(d=>{
            if (d.id == this.dashSelected){
                d.graficos.forEach((g,idx)=>{
                    //encontrar o grafico e onde ele fica no array de graficos
                    if(g.id == id){
                        //remover o grafico do array de graficos do dashboard selecionado
                        d.graficos.splice(idx,1)
                        //redesenhar os graficos na tela e o painel de graficos
                        desenharGraficos()
                        drawPainelGraphcs()
                    }
                })
            }
        })
    }
    //adicionar novo grafico
    novoGrafico(){
        //variavel que verifica se todos os campos foram preenchidos dos dados do grafico
        var preenchido = true
        //quantas elementos vao ser necessários verificar
        var vezes = document.getElementById('elementosG').value
        //laço para verificar se os campos dos dados não estão prenchhidos preenchidos
        for (var i =0;i<vezes;i++){
            if (!document.getElementById(`nad${i+1}`).value || !document.getElementById(`nud${i+1}`).value || !document.getElementById(`cor${i+1}`).value ){
                preenchido = false
            }
        }
        //verifica se preenchido for falso, se sim mostra um alerta
        if(!preenchido){
            window.alert("Preencha tudo")
        }
        else{
            //obter os valores de nome e tipo e dasboardselecionado
            var id_dash = this.dashSelected;
            var nome = document.getElementById('nomeG').value
            var tipo = document.getElementById('tipoG').value
            var elementos =[]
            //obter todos os nomes dos elementos do grafico e colocar no array elementos
            for (var i =0;i<vezes;i++){
                var c = document.getElementById(`nad${i+1}`).value
                elementos.push(c) 
            }
            var dados =[]
            //obter todos os nomes dos elementos do grafico e colocar no array dados
            for (var i =0;i<vezes;i++){
                var c = document.getElementById(`nud${i+1}`).value
                dados.push(c) 
            }
            //obter todos os nomes dos elementos do grafico e colocar no array cores
            var cores=[]
            for (var i =0;i<vezes;i++){
                var c = document.getElementById(`cor${i+1}`).value
                cores.push(c) 
            }

            //obter o filtro
            var ordem = document.getElementById('ordemG').value
            //crair novo grafico a partir dos dados que foram fornecidos
            var graficoNovo= new grafico(this.ngraf,tipo,elementos,dados,id_dash,nome,cores,ordem);
            this.ngraf++
            //adicionar no dashboard o novo grafico
            this.dashboard.forEach(element => {
                if (element.id == this.dashSelected){
                    element.graficos.push(graficoNovo)
                    console.log(elementos.graficos)
                }
                
            });
            //desenhar os graficos e o painel
            painelDash()
            desenharGraficos()
        }
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
    constructor(id,tipo,elementos,dados,id_dash,nome,cores,ordem){
        this.id = id
        this.tipo = tipo
        this.elementos = elementos
        this.dados = dados
        this.id_dash = id_dash
        this.nome = nome
        this.cores = cores
        this.ordem = ordem
    }
}
class dado{
    constructor(nome,valor,cor){
        this.nome = nome
        this.valor = valor
        this.cor = cor
    }
}
//desenar cada dashboard listado do usuario em um container dentro do painel de dashboard
function drawnDash(){
    var dashs = ''
    user.dashboard.forEach(d => {
        dashs += `
        <div id = "${d.id}" class="graph" onclick = "user.selecionarDash(${d.id})">
        <img src="home/img/painel-de-controle.png" width="38" style="margin-right:10px;" alt="lixeira">
        <h3 style="margin-right:15px;">${d.nome}</h3>
        <button onclick="user.removerDashboard(event,${d.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
        </div>
        `
    });
    document.getElementById('container-Dashboards').innerHTML = dashs
}
//abrir painel de usuario
function abrirUser(){
    var telanovo = 
    `
    <div style="margin-left:2px; overflow:hidden;display:flex;flex-direction:column;align-itens:center;" >
    <div style="display: flex;align-items: center;align-self: flex-start;">
        <button onclick="abrirAside('user')"><img src="home/img/de-volta (1).png" alt="voltar"></button>
        <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
        </div>
    <h1 class="item">Usuario</h1>
    <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
        <h5 style="color:rgb(196, 193, 193);" for="name_dashboard">Nome: </h5>
        <h5 style="color:#0AC00A;">${user.nome}</h5>
        
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
        <h5 style="color:rgb(196, 193, 193);" for="name_dashboard">Email: </h5>
        <h5 style="color:#0AC00A;">${user.email}</h5>
        
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between;margin-top: 10px;">
        <h5 style="color:rgb(196, 193, 193);" for="name_dashboard">Senha: </h5>
        <h5 style="color:#0AC00A;">${user.senha}</h5>
        
    </div>
    <button style="background-color: red;color: white;font-weight: 400;font-size:14pt;width:60%;margin:auto;margin-top:30px;border-radius:3px;">Sair</button>
    </div
    `
    document.querySelector('#container-home').innerHTML = telanovo
    abrirAside('user')
}
//colocar a tela de dashboard no aside
function abrirDash(){
    var teladash =
    `<div id="menudashboard">
    
    <div style="display: flex;flex-direction: column;flex: 1;overflow: scroll;">
    <div style="display: flex;align-items: center;align-self: flex-start;">
        <button onclick="abrirAside('dashs')"><img src="home/img/de-volta (1).png" alt="voltar"></button>
        <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
    </div>
        <h1 class="item">Dashboards</h1>
        <div id="container-Dashboards">
        </div>
    </div>
     </div>`
    document.querySelector('#container-home').innerHTML = teladash
    drawnDash()
    abrirAside('dashs')
}
//tela exibida após selecionar um dashboard,
function painelDash(){
    var telanovo = 
    `            
    <div style="margin-left:2px; overflow:hidden; display: flex;flex-direction: column;align-items: center;" >
    <div style="display: flex;align-items: center;align-self: flex-start;">
        <button onclick="backDash()"><img src="home/img/de-volta (1).png" alt="voltar"></button>
        <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
    </div>
    <h1 class="item">Gráficos</h1>
    <div id="container-graficos">
    </div>
    <button onclick="criarGraficoPainel()" style="font-weight: 400;font-size: 12pt;color:#ffffff;background-color: #0AC00A;padding: 8px;width: 160px;align-self: center;border-radius: 4px;margin-top: 15px;"> Adicionar Gráfico</button>
    </div>
    </div>
    `

document.querySelector('#container-home').innerHTML = telanovo
drawPainelGraphcs()

}
//voltar para a tela anterior depois de selecionar um dashboard
function backDash(){
    var teladash =
    `<div id="menudashboard">
    
    <div style="display: flex;flex-direction: column;flex: 1;overflow: scroll;">
    <div style="display: flex;align-items: center;align-self: flex-start;">
        <button onclick="abrirAside('dashs')"><img src="home/img/de-volta (1).png" alt="voltar"></button>
        <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
    </div>
        <h1 class="item">Dashboards</h1>
        <div id="container-Dashboards">
        </div>
    </div>
</div>`
    document.querySelector('#container-home').innerHTML = teladash
    
    drawnDash()
}
//desenhar o container de graficos listados dentro do dashboard selecionado
function drawPainelGraphcs(){
    var telanovo= ''
    user.dashboard.forEach(d=>{
        if(d.id == user.dashSelected){
            d.graficos.forEach(g=>{
                if(g.tipo == 'line'){
                    telanovo += `<div id="pg${g.id}" onclick="abrirGrafico(${g.id})" class="graph">
                    <img src="home/img/icon-graph/grafico-de-linha.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button onclick="user.removeGraph(event,${g.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
                if(g.tipo == 'bar'){
                    telanovo += `<div class="graph" id="pg${g.id}" onclick="abrirGrafico(${g.id})">
                    <img src="home/img/icon-graph/grafico-de-barras.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button onclick="user.removeGraph(event,${g.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
                if(g.tipo == 'pizza'){
                    telanovo += `<div class="graph" id="pg${g.id}" onclick="abrirGrafico(${g.id})">
                    <img src="home/img/icon-graph/grafico-de-pizza.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button onclick="user.removeGraph(event,${g.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
                if(g.tipo == 'doughnut'){
                    telanovo += `<div class="graph" id="pg${g.id}" onclick="abrirGrafico(${g.id})">
                    <img src="home/img/icon-graph/grafico-de-rosca.png" alt="grafico de barra">
                    <p>${g.nome}</p>
                    <button onclick="user.removeGraph(event,${g.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
                </div>`
                }
            })
            document.querySelector('#container-graficos').innerHTML = telanovo
        }
    })

}
//dsenar painel de adicionar dashboard
function abrirNovo(){
    var telanovo = `
    
    <div style="margin-left:2px; overflow:hidden;" >
    <div style="display: flex;align-items: center;align-self: flex-start;">
    <button onclick="abrirAside('add')"><img src="home/img/de-volta (1).png" alt="voltar"></button>
    <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
    </div>
        <h1 style="margin-bottom: 15px;" class="item">Novo dashboard</h1>
        <label  for="name_dashboard" >Nome:</label>
        <div style="display:flex;flex-direction: column; justify-content:center;margin-top:5px;">
        <input type="text" id="name_dashboard" class="named" placeholder="Digite o nome" style="margin-bottom:20px;">
        <button onclick="user.adicionarDashboard()" id="addDash">Adicionar</button>
        </div>
    </div>`
    document.querySelector('#container-home').innerHTML = telanovo
    abrirAside('add')
}
//desenhar a tela inicial no main
function defaltmain(){
   var content = `
            <div style="align-self: center;margin: auto;">
            <div style="display:flex;align-items:center;justify-content:center;">
                <h1 style="font-size: 28pt;margin-right:5px">Seja bem vindo ao Dash</h1>
                <div style="background-color:yellow; width:60px;border-radius:4px;">
                <h1 style="color:black;font-weight:800;text-align:center;padding:5px;font-size:20pt;">Hub</h1>
                </div>
            </div>
                
                
                <h4 style="font-size: 16pt;color: #0AC00A;">Crie um novo Dashboard</h4>
            </div>
    `
    document.querySelector('#Dashboard').innerHTML = content
}
//abrir a barra lateral ou fechar
function abrirAside(nome){
    //obtem o nome do conteudo atual da barra
    var aside = document.querySelector('aside')
    //se a tela que foi apertada já está sendo exibida ele incrementa os clicks
    if (as.botaoAmostra== nome){
        as.clicks++
        //se o click for menor que 3 ele abre ou fecha dashboard
        if(as.clicks<3){
            aside.classList.toggle('abrir_dash')
            as.clicks=0
            as.botaoAmostra=''
        }
    }else {
        //se a tela selecinada for outra ele zera o contador de clicks e muda o nome
        as.clicks=0
        as.clicks++
        as.botaoAmostra = nome
        aside.classList.add('abrir_dash')
    }

}
function abrirGrafico(idx){
    if(gselected.graficoID == idx){
        gselected.graficoID = null
        desenharGraficos()
    }
    else{
        gselected.graficoID = idx
        var canvas= ''
    var container = document.getElementById('Dashboard')
    //percorrer todo o dashboard e encontrar o que está selecionado
    user.dashboard.forEach(dash=>{
        if (dash.id == user.dashSelected){
            //criar um canvas para cada grafico, o id do grafico é atribuido ao canva
            dash.graficos.forEach(g=>{
                if (g.id == idx){
                  if (g.tipo == 'line'|| g.tipo == 'bar'){
                    canvas+= `
                    <div class="selectG">
                    <canvas id="g${g.id}"></canvas>
                    </div>`

                }
                else{
                    canvas+= `
                <div class="selectG">
                <canvas id="g${g.id}"></canvas>
                </div>`
                }  
                }
                
                
            })
            //adicionando ao html todo os canvas
            container.innerHTML = canvas
            //percorrer novamente todos os graficos no objeto usuario
            dash.graficos.forEach(g=>{
                if(g.id == idx){
                    //criando array de dados
                var dados = []
                //percorrer cada grafico e obter o array de elementos, dados e cores e id
                g.elementos.forEach((e,id)=>{
                    //instancioando o objeto data que vai receber e estruturar todos os dados
                    var data = new dado(e,g.dados[id],g.cores[id])
                    dados.push(data)
                })
                console.log(g);
                //obter a ordem escolhida no grafico e ordenar o valor
                if(g.ordem == 'maior'){
                    dados.sort((a, b) => b.valor - a.valor);
                }
                if(g.ordem == 'menor'){
                    dados.sort((a, b) => a.valor - b.valor);
                }
                //adicionar grafico do tipo barra
                if(g.tipo == 'bar'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    var myBarChart = new Chart(ctx, {
                        type: 'bar',  // Especifica o tipo de gráfico: 'bar'
                        data: {
                          labels: dados.map(d=>d.nome), // Rótulos no eixo X
                          datasets: [{
                            label: g.nome,
                            data:dados.map(d=>d.valor),
                            backgroundColor:dados.map(d=>d.cor),  // Dados para cada mês
                            maxBarThickness:40,
                            borderWidth: 1 // Largura da borda das barras
                          }]
                        },
                        options: {
                        
                          scales: {
                            x: {
                                ticks: {
                                    color: '#fff', // Cor do texto das etiquetas do eixo X
                                    font: {
                                        size: 14 // Tamanho da fonte das etiquetas do eixo X
                                    }
                                },
                                grid: {
                                    color: 'gray', // Cor das linhas de grade do eixo X
                                    lineWidth: 1, // Espessura das linhas de grade do eixo X
                                }
                            },
                            y: {
                              beginAtZero: true,
                              ticks: {
                                color: '#fff', // Cor do texto das etiquetas do eixo Y
                                font: {
                                    size: 14 // Tamanho da fonte das etiquetas do eixo Y
                                }
                            },
                            grid: {
                                color: 'gray', // Cor das linhas de grade do eixo Y
                                lineWidth: 1 // Espessura das linhas de grade do eixo Y
                            } // Iniciar o eixo Y em zero
                            }
                          }
                          
                        }
                      });
                }
                //adicionar grafico do tipo pizza
                if(g.tipo == 'pizza'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    var myPieChart = new Chart(ctx, {
                        type: 'pie',  // Especifica o tipo de gráfico: 'pie'
                        data: {
                          labels:dados.map(d=>d.nome),  // Rótulos para cada fatia
                          datasets: [{
                            label: g.nome,
                            data: dados.map(d=>d.valor),  // Valores para cada fatia
                            backgroundColor: dados.map(d=>d.cor),
                            borderWidth: 2  // Largura das bordas das fatias
                          }]
                        },
                        options: {
                          responsive: true, // faz o gráfico ser responsivo
                        maintainAspectRatio: true,
                          plugins: {
                            legend: {
                                position: 'left',
                            },
                            title: {
                                display: true,
                                text: g.nome,
                                    color:'white',
                                    font: {
                                        size: 16 // Define o tamanho da fonte do título
                                    }
                            },
                            tooltip: {
                              enabled: true , // Habilita tooltips ao passar o mouse
                              callback:{
                                label: function(context){
                                    let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw; // Mostra o valor bruto da fatia
                                return label;
                                }
                              }
                            }
                          }
                        }
                      });
                }
                //adicionar grafico do tipo Linha
                if(g.tipo == 'line'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    const myLineChart = new Chart(ctx, {
                        type: 'line', // Tipo de gráfico: linha
                        data: {
                            labels:dados.map(d=>d.nome),
                            datasets: [{
                                label: g.nome,
                                data:  dados.map(d=>d.valor),
                                fill: true, // Se deve preencher a área abaixo da linha
                                backgroundColor: g.cores,
                                borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
                                borderWidth: 2, // Espessura da linha
                                pointBackgroundColor:'rgba(75, 192, 192, 1)' , // Cor dos pontos
                                pointBorderColor: '#fff', // Cor da borda dos pontos
                                pointRadius: 5 // Tamanho dos pontos
                            }]
                        },
                        options: {responsive: true, // faz o gráfico ser responsivo
                        maintainAspectRatio: true,
                            
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#fff', // Cor do texto das etiquetas do eixo X
                                        font: {
                                            size: 14 // Tamanho da fonte das etiquetas do eixo X
                                        }
                                    },
                                    grid: {
                                        color:'white',
                                        lineWidth: 1, // Espessura das linhas de grade do eixo X
                                    }
                                },
                                y: {
                                    beginAtZero: true // O eixo Y começa em zero,
                                    ,ticks: {
                                        color: '#fff', // Cor do texto das etiquetas do eixo X
                                        font: {
                                            size: 14 // Tamanho da fonte das etiquetas do eixo X
                                        }
                                    },
                                    grid: {
                                        color:'white',
                                        lineWidth: 1, // Espessura das linhas de grade do eixo X
                                    }
                                }
                            },
                            plugins: {
                                
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            return `${context.dataset.label}: ${context.parsed.y}`; // Exibir label e valor
                                        }
                                    }
                                }
                            }
                        }
                    }); 
                }
                //adicionar grafico do tipo Rosquinha
                if(g.tipo == 'doughnut'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    const donnut = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: dados.map(d=>d.nome),
                            datasets: [{
                                label: g.nome,
                                data: dados.map(d=>d.valor),
                                backgroundColor:dados.map(d=>d.cor) ,
                                hoverOffset: 4
                            }]
                        },
                        options: {
                          responsive: true, // faz o gráfico ser responsivo
                        maintainAspectRatio: true,  responsive: true,  // Mantém o gráfico responsivo
                            
                            plugins: {
                                legend: {
                                    position: 'left',
                                },
                                title: {
                                    display: true,
                                    text: g.nome,
                                    color:'white',
                                    font: {
                                        size: 16// Define o tamanho da fonte do título
                                    }
                                }
                            }
                        }
                    });
                }
                }
                
            })
            
        }
    })
    }
    
   
}
//desenha os graficos no container de graficos 
function desenharGraficos(){
    var canvas= ''
    var container = document.getElementById('Dashboard')
    //percorrer todo o dashboard e encontrar o que está selecionado
    user.dashboard.forEach(dash=>{
        if (dash.id == user.dashSelected){
            //criar um canvas para cada grafico, o id do grafico é atribuido ao canva
            dash.graficos.forEach(g=>{
                if (g.tipo == 'line'|| g.tipo == 'bar'){
                    canvas+= `
                    <div class="container-g">
                    <canvas id="g${g.id}"></canvas>
                    </div>`

                }
                else{
                    canvas+= `
                <div class="container-g">
                <canvas id="g${g.id}"></canvas>
                </div>`
                }
                
            })
            //adicionando ao html todo os canvas
            container.innerHTML = canvas
            //percorrer novamente todos os graficos no objeto usuario
            dash.graficos.forEach(g=>{
                //criando array de dados
                var dados = []
                //percorrer cada grafico e obter o array de elementos, dados e cores e id
                g.elementos.forEach((e,id)=>{
                    //instancioando o objeto data que vai receber e estruturar todos os dados
                    var data = new dado(e,g.dados[id],g.cores[id])
                    dados.push(data)
                })
                console.log(g);
                //obter a ordem escolhida no grafico e ordenar o valor
                if(g.ordem == 'maior'){
                    dados.sort((a, b) => b.valor - a.valor);
                }
                if(g.ordem == 'menor'){
                    dados.sort((a, b) => a.valor - b.valor);
                }
                //adicionar grafico do tipo barra
                if(g.tipo == 'bar'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    var myBarChart = new Chart(ctx, {
                        type: 'bar',  // Especifica o tipo de gráfico: 'bar'
                        data: {
                          labels: dados.map(d=>d.nome), // Rótulos no eixo X
                          datasets: [{
                            label: g.nome,
                            data:dados.map(d=>d.valor),
                            backgroundColor:dados.map(d=>d.cor),  // Dados para cada mês
                            maxBarThickness:40,
                            borderWidth: 1 // Largura da borda das barras
                          }]
                        },
                        options: {
                        
                          scales: {
                            x: {
                                ticks: {
                                    color: '#fff', // Cor do texto das etiquetas do eixo X
                                    font: {
                                        size: 14 // Tamanho da fonte das etiquetas do eixo X
                                    }
                                },
                                grid: {
                                    color: 'gray', // Cor das linhas de grade do eixo X
                                    lineWidth: 1, // Espessura das linhas de grade do eixo X
                                }
                            },
                            y: {
                              beginAtZero: true,
                              ticks: {
                                color: '#fff', // Cor do texto das etiquetas do eixo Y
                                font: {
                                    size: 14 // Tamanho da fonte das etiquetas do eixo Y
                                }
                            },
                            grid: {
                                color: 'gray', // Cor das linhas de grade do eixo Y
                                lineWidth: 1 // Espessura das linhas de grade do eixo Y
                            } // Iniciar o eixo Y em zero
                            }
                          }
                          
                        }
                      });
                }
                //adicionar grafico do tipo pizza
                if(g.tipo == 'pizza'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    var myPieChart = new Chart(ctx, {
                        type: 'pie',  // Especifica o tipo de gráfico: 'pie'
                        data: {
                          labels:dados.map(d=>d.nome),  // Rótulos para cada fatia
                          datasets: [{
                            label: g.nome,
                            data: dados.map(d=>d.valor),  // Valores para cada fatia
                            backgroundColor: dados.map(d=>d.cor),
                            borderWidth: 2  // Largura das bordas das fatias
                          }]
                        },
                        options: {
                          responsive: true, // faz o gráfico ser responsivo
                        maintainAspectRatio: true,
                          plugins: {
                            legend: {
                                position: 'left',
                            },
                            title: {
                                display: true,
                                text: g.nome,
                                    color:'white',
                                    font: {
                                        size: 16 // Define o tamanho da fonte do título
                                    }
                            },
                            tooltip: {
                              enabled: true , // Habilita tooltips ao passar o mouse
                              callback:{
                                label: function(context){
                                    let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw; // Mostra o valor bruto da fatia
                                return label;
                                }
                              }
                            }
                          }
                        }
                      });
                }
                //adicionar grafico do tipo Linha
                if(g.tipo == 'line'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    const myLineChart = new Chart(ctx, {
                        type: 'line', // Tipo de gráfico: linha
                        data: {
                            labels:dados.map(d=>d.nome),
                            datasets: [{
                                label: g.nome,
                                data:  dados.map(d=>d.valor),
                                fill: true, // Se deve preencher a área abaixo da linha
                                backgroundColor: g.cores,
                                borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
                                borderWidth: 2, // Espessura da linha
                                pointBackgroundColor:'rgba(75, 192, 192, 1)' , // Cor dos pontos
                                pointBorderColor: '#fff', // Cor da borda dos pontos
                                pointRadius: 5 // Tamanho dos pontos
                            }]
                        },
                        options: {responsive: true, // faz o gráfico ser responsivo
                        maintainAspectRatio: true,
                            
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#fff', // Cor do texto das etiquetas do eixo X
                                        font: {
                                            size: 14 // Tamanho da fonte das etiquetas do eixo X
                                        }
                                    },
                                    grid: {
                                        color:'white',
                                        lineWidth: 1, // Espessura das linhas de grade do eixo X
                                    }
                                },
                                y: {
                                    beginAtZero: true // O eixo Y começa em zero,
                                    ,ticks: {
                                        color: '#fff', // Cor do texto das etiquetas do eixo X
                                        font: {
                                            size: 14 // Tamanho da fonte das etiquetas do eixo X
                                        }
                                    },
                                    grid: {
                                        color:'white',
                                        lineWidth: 1, // Espessura das linhas de grade do eixo X
                                    }
                                }
                            },
                            plugins: {
                                
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            return `${context.dataset.label}: ${context.parsed.y}`; // Exibir label e valor
                                        }
                                    }
                                }
                            }
                        }
                    }); 
                }
                //adicionar grafico do tipo Rosquinha
                if(g.tipo == 'doughnut'){
                    var grafico = document.getElementById(`g${g.id}`)
                    var ctx = grafico.getContext('2d')
                    const donnut = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: dados.map(d=>d.nome),
                            datasets: [{
                                label: g.nome,
                                data: dados.map(d=>d.valor),
                                backgroundColor:dados.map(d=>d.cor) ,
                                hoverOffset: 4
                            }]
                        },
                        options: {
                          responsive: true, // faz o gráfico ser responsivo
                        maintainAspectRatio: true,  responsive: true,  // Mantém o gráfico responsivo
                            
                            plugins: {
                                legend: {
                                    position: 'left',
                                },
                                title: {
                                    display: true,
                                    text: g.nome,
                                    color:'white',
                                    font: {
                                        size: 16// Define o tamanho da fonte do título
                                    }
                                }
                            }
                        }
                    });
                }
            })
            
        }
    })
    
}
//funão para desenhar os campos referentes a nome valor e cor dos dados a serem atribuidos no novo grafico criado
function drawndados(){

    //VERIFICA SE O VALOR NOME E´VALIDO
    if (!document.getElementById('nomeG').value){
        window.alert("Preencha corretamente os campos")
    }
    else{
        //gera todos os campos a depender do numero de lementos colocados
        var n = document.getElementById('elementosG').value
        var container = document.getElementById('container-data')
        var d = ''
        for (var i = 0;i<n;i++){
            d += `<div class="data">
                        <p>${i+1}</p>
                        <input id="nad${i+1}" class="inputs_data"  type="text" placeholder="Nome">
                        <input id="nud${i+1}"  class="inputs_data"  type="number" placeholder="Valor">
                        <input id="cor${i+1}"  style="width: 10%;background-color: transparent;"  type="color" name="" id="">
                    </div>`
        }
        container.innerHTML = d
        document.getElementById('criar-g').style.display = 'block'
    }
    
    
}
//desenar no aside a tela de adicionar o grafico
function criarGraficoPainel(){
    var telanovo = 
    `
    <div style="margin-left:2px; overflow:hidden;display:flex;flex-direction:column;align-itens:center;" >
                <div style="display: flex;align-items: center;align-self: flex-start;">
                    <button onclick="painelDash()"><img src="home/img/de-volta (1).png" alt="voltar"></button>
                    <p style="margin-left: 8px;margin-bottom: 4px;">voltar</p>
                    </div>
                    <h1 class="item">Novo Gráfico</h1>
                        <label for="nomeG">Nome:</label>
                        <input class="named" type="text"id="nomeG">
                        <div style="display:flex;align-items: center;justify-content: space-between;margin-top: 10px;">
                        <label for="tipoG">Tipo:</label>
                        <label for="elementosG" >Elementos:</label>
                        </div>
                        <div style="display: flex;justify-content: space-between;">
                            <select name="tipos" id="tipoG">
                                <option value="bar">Barra</option>
                                <option value="pizza">Pizza</option>
                                <option value="line">Linha</option>
                                <option value="doughnut">Rosca</option>
                            </select>
                            <input class="named" style="width: 100px;text-align:center;" type="number" id="elementosG" min="1">
                        </div>
                        <label for="elementosG">Ordem:</label>
                        <select name="ordem" id="ordemG">
                            <option value="nada">Nenhuma</option>
                            <option value="maior">Decrescente</option>
                            <option value="menor">Crescente</option>
                        </select>
                        <button onclick="drawndados()" style="background-color: #0AC00A;padding: 10px;border-radius: 6px;margin-top:15px;">Adicionar</button>
            </div>
                        
            <h1 class="item">Dados</h1>
            <div id="container-data">            
            </div>
            <button onclick="user.novoGrafico()" id="criar-g" style="display:none;background-color: #0AC00A;width: 60%;padding: 10px;border-radius: 6px;align-self: center;">Criar Gráfico</button>
    `
    as.botaoAmostra="dashs"
    as.clicks--
    document.querySelector('#container-home').innerHTML = telanovo
    
}
//instanciaão do usuario 
var user = new usuario(0,'Paulo','123','paulo@gmail.com',[])
//objeto que controla o comportamento da barra lateral
var as = {botaoAmostra:'',clicks:0}
var gselected = {graficoID:null}
defaltmain()