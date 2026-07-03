async function atualizar(){

    const resposta = await fetch("http://localhost:3000/dados");

    const dados = await resposta.json();

    document.getElementById("temperatura").innerText = dados.temperatura;
    document.getElementById("umidade").innerText = dados.umidade;
    document.getElementById("qualidadeAr").innerText = dados.qualidadeAr;
   

}

setInterval(atualizar,1000);

atualizar();