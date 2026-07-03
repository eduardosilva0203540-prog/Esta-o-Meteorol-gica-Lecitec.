const express = require("express");
const cors = require("cors");

const app = express();

// ===============================
// CONFIGURAÇÕES
// ===============================

// Chave secreta (deve ser a mesma da ESP32)
const API_KEY = "lecitec_2026_seguro";

// Permite acesso do frontend
app.use(cors());

// Permite receber JSON
app.use(express.json());

// ===============================
// DADOS DA ESTAÇÃO
// ===============================

let dados = {
  temperatura: 0,
  umidade: 0,
  qualidadeAr: "Boa"
};

// ===============================
// ROTA PARA RECEBER DADOS DA ESP32
// ===============================

app.post("/dados", (req, res) => {

  const chaveRecebida = req.headers["x-api-key"];

  if (chaveRecebida !== API_KEY) {
    return res.status(403).json({
      sucesso: false,
      mensagem: "Acesso negado."
    });
  }

  dados = {
    temperatura: req.body.temperatura,
    umidade: req.body.umidade,
    qualidadeAr: req.body.qualidadeAr
  };

  console.log("--------------------------------");
  console.log("Novos dados recebidos:");
  console.log(dados);

  res.json({
    sucesso: true,
    mensagem: "Dados recebidos com sucesso."
  });

});

// ===============================
// ROTA PÚBLICA
// ===============================

app.get("/dados", (req, res) => {
  res.json(dados);
});

// ===============================
// ROTA TESTE
// ===============================

app.get("/", (req, res) => {
  res.send("Servidor da Estação Meteorológica funcionando!");
});

// ===============================
// INICIAR SERVIDOR
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});