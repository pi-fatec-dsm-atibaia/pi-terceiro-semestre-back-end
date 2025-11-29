import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname,'.env') });

import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger';
import sequelize from './config/database';

import './models/associations';

//Routes imports
import studentRoutes from './routes/studentRoutes';
import advisorRoutes from './routes/advisorRoutes';
import adminRoutes from './routes/adminRoutes';
import courseRoutes from './routes/courseRoutes';
import requestRoutes from './routes/requestRoutes';
import linkRoutes from './routes/linkRoutes';
import authRoutes from './routes/authRoutes';
import employerRoutes from './routes/EmployerRoutes';
import { request } from 'http';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/students', studentRoutes);
app.use('/api/advisors', advisorRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/link', linkRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Cadastro de Alunos' });
});

const startServer = async () => {
  try {

    console.log("JWT_SECRET: ", process.env.JWT_SECRET);
    console.log("MAILGUN_API_KEY: ", process.env.MAILGUN_API_KEY);
    

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