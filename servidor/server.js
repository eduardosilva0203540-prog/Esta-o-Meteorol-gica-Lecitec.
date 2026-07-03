const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Dados padrão (evita perda de estrutura)
let dados = {
  temperatura: 0,
  umidade: 0,
  qualidadeAr: 0,
};

// 📥 Atualizar dados
app.post("/dados", (req, res) => {
  dados = { ...dados, ...req.body };

  console.log("Dados atualizados:");
  console.log(dados);

  res.json({
    status: "OK",
    mensagem: "Dados atualizados com sucesso",
    dados
  });
});

// 📤 Buscar dados
app.get("/dados", (req, res) => {
  res.json(dados);
});

// 🔥 Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});