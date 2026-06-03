// modulos externos
import express from 'express'
import cors from 'cors'
// modulos internos
import { times } from './bd.js'
import { buscarTime } from './buscartime.js'
import { calcularPontos } from './calcularpontos.js'
import { top8 } from './top8.js'
import { topSaldo } from './top4saldo.js'
import { ordenados } from './ordenador.js'
import { classificadoss } from './classificadoss.js'
import { desempenho } from './desempenho.js'

const app = express()

app.use(cors({
origin: '*'
}));


app.get('/', (req, res) => {
res.send('Hello World')
})

app.get('/times', (req, res) => {
res.json(times)
})

// calcular pontos
app.get('/calcularpontos', (req, res) => {
calcularPontos(times)
res.json(times)
})

// buscar time
app.get('/times/:nome', (req, res) => {
const nome = req.params.nome
const resultado = buscarTime(nome, times)
res.json(resultado)
})

// top 8
app.get('/top8', (req, res) => {
res.json(top8(times))
})

// top 4 saldo
app.get('/topsaldo', (req, res) => {
res.json(topSaldo(times))
})

app.get('/classificadoss', (req, res) => {
res.json(classificadoss(times))
})

app.get('/desempenho', (req, res) => {
res.json(desempenho(times))
})

app.get('/ordenados', (req, res) => {
res.json(ordenados(times))
})


app.listen(3000, () => {
console.log('Server is running on http://localhost:3000')
})