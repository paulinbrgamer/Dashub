class usuario{
    constructor(id,nome,senha,email,dashboard){
        this.id = id
        this.nome = nome
        this.senha = senha
        this.email = email
        this.dashboard = dashboard
        this.ndash = 0
    }
    adicionarDashboard(){
        var iName = document.getElementById('name_dashboard')
        if(typeof iName.value === 'string' && iName.value.trim().length > 0){
            var novoDash = new dashboard(iName.value,this.ndash,[],this.id)
            this.ndash++
            this.dashboard.push(novoDash)
            iName.value = ''
            drawnDash()
        }
        else{
            window.alert("Digite um nome valido") 
        }
    }
    removerDashboard(id){
        this.dashboard.forEach((element,idx) => {
            if (element.id == id){
                this.dashboard.splice(idx,1)
            }
        });
        this.ndash--
        drawnDash()
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
        <div class="dashboard">
        <h3>${d.nome}</h3>
        <button onclick="user.removerDashboard(${d.id})" id="delete-dash"><img src="home/img/001-lixeira.png" width="24" alt="lixeira"></button>
        </div>
        `
    });
    document.getElementById('container-Dashboards').innerHTML = dashs
}
var user = new usuario(0,'Paulo','123','paulogmail',[])