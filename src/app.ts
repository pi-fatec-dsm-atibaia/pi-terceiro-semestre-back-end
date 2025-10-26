import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';
import sequelize from './config/database';
import studentRoutes from './routes/studentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Cadastro de Alunos' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');
    
    await sequelize.sync();
    console.log('Tabelas sincronizadas.');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
  }
};

startServer();