import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.send('Usuário Criado com sucesso!');
});

app.get('/usuarios', async (req, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.send('Usuário deletado com sucesso!');
});

app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.send('Usuário editado com sucesso!');
});

app.listen(3443);
