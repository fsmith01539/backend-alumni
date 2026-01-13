const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const alumniRoutes = require('./routes/alumni.routes');
const { errorMiddleware } = require('./middlewares/error.middleware');
const { logger } = require('./middlewares/logger.middleware');
const authRoutes = require('./routes/auth.routes');
const meRoutes = require('./routes/me.routes');

require('dotenv').config();

const app = express();

// --- Middlewares Globais ---
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

// --- Rotas ---
app.use('/alumni', alumniRoutes);
app.use('/auth', authRoutes);
app.use('/me', meRoutes);

// --- Rota de Teste (Health Check) ---
app.get('/', (req, res) => {
  res.status(200).json({
    projeto: 'Portal Alumni',
    status: 'Online',
    timestamp: new Date().toISOString(),
  });
});

// --- Middleware de Erro (DEVE ser o último antes do export/listen) ---
app.use(errorMiddleware);

// --- Inicialização do Servidor (Local) ---
const PORT = process.env.PORT || 3001;

// Na Vercel, o 'listen' não é estritamente necessário, 
// mas mantemos para você rodar localmente com 'npm run dev'
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor voando em http://localhost:${PORT}`);
  });
}

// --- ESSENCIAL PARA VERCEL ---
module.exports = app;