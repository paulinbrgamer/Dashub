<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/style.css">
    <link rel="stylesheet" href="home/home.css">
    <link rel="shortcut icon" href="home/img/Favicon.png" type="image/png">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>

    <title>DashHub</title>
</head>
<body>
    <nav id="nav_opcoes">
        <button onclick="abrirUser()" id="userbtn" class="nav_btns"></button>
        <button onclick="abrirDash()" id="dashboardsbtn" class="nav_btns"></button>
        <button onclick="abrirNovo()" id="addbtn" class="nav_btns"></button>
        <button onclick="AbrirRepositorios()" id="nav_git" class="nav_btns"></button>
    </nav>
    <aside>
        <div id="container-home" class="aparecer">
            
        </div>
    </aside>
    
    <main>
        
        <h1 style="padding-bottom: 15px;text-align: center;width: 100%;" id="titled"></h1>
        <div id="Dashboard">
            
            
        </div>
    </main>
    <script src="home/home.js"></script>
</body>
</html>