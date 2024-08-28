import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email:  req.body.email,
            name:    req.body.name,
            age:     req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email:  req.body.email,
            name:    req.body.name,
            age:     req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        },
    })

    res.status(200).json({message: "Usuario deletado com sucesso!"})
})

/*
- METODOS HTTP -
C REATE -> POST
R EAD   -> GET
U PDATE -> PUT
D ELETE -> DELETE

- CONEXÃO COM BANCO DE DADOS -
1 - cria o banco de dados 
2 - cria o usuario e a senha
3 - instala o prisma -> npm install prisma --save-dev
4 - inicializa o prisma -> npx prisma init
5 - muda o .env para o link do banco e coloca o user, a senha e depois do .net/NOME_DO_BANCO

- CRIAÇÃO DE TABELAS/COLLECTIONS
1- cria a tabelo no schema.prisma
2 - da o comando npx prisma db push
3 - visualizar a tabela -> npx prisma studio
*/

app.listen(3000)