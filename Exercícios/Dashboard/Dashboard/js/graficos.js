import { pegarDados } from './script.js';

const dados = await pegarDados();
const times = dados.times ?? [];

const top8Pontos = [...times].sort((a, b) => b.pts - a.pts).slice(0, 8);
const top4Saldo = [...times].sort((a, b) => (b.saldoGols ?? 0) - (a.saldoGols ?? 0)).slice(0, 4);
const rankingOrdenado = [...times].sort((a, b) => b.pts - a.pts);
const timesClassificados = times.filter((time) => time.classificado);
const totalPontos = times.reduce((soma, time) => soma + (time.pts || 0), 0);

const ctx1 = document.getElementById('myChart')?.getContext('2d');
const ctx2 = document.getElementById('Gr2')?.getContext('2d');
const ctx3 = document.getElementById('Gr3')?.getContext('2d');
const ctx4 = document.getElementById('Gr4')?.getContext('2d');
const ctx5 = document.getElementById('Gr5')?.getContext('2d');

//Grafico 1: Top 8 por pontuação

if (!ctx1 || !ctx2 || !ctx3 || !ctx4 || !ctx5) {
  console.error('Um ou mais elementos canvas não foram encontrados.');
} else {
  const cores = ['#77ade7', '#ffad5b', '#ffc2c3', '#95fff6', '#9eff91', '#ffe894', '#f87fd6', '#d39dff'];

  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: top8Pontos.map((time) => time.time),
      datasets: [{
        label: 'Pontos',
        data: top8Pontos.map((time) => time.pts),
        backgroundColor: cores.slice(0, top8Pontos.length),
        borderColor: '#1f2937',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Top 8 por pontuação' } },
      scales: { y: { beginAtZero: true } }
    }
  });

  //Gráfico 2: Top 4 por saldo de gols

  new Chart(ctx2, {
    type: 'polarArea',
    data: {
      labels: top4Saldo.map((time) => time.time),
      datasets: [{
        label: 'Saldo de gols',
        data: top4Saldo.map((time) => time.saldoGols ?? 0),
        backgroundColor: ['rgb(130, 221, 164)', 'rgb(115, 154, 240)', 'rgb(247, 160, 160)', 'rgba(243, 161, 239, 0.91)']
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Top 4 por saldo de gols' } }
    }
  });

  //Gráfico 3: Ranking ordenado por pontos

  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: rankingOrdenado.map((time) => time.time),
      datasets: [{
        label: 'Pontuação',
        data: rankingOrdenado.map((time) => time.pts),
        fill: false,
        borderColor: '#2563eb',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Ranking ordenado por pontos' } },
      scales: { y: { beginAtZero: true } }
    }
  });

  //Gráfico 4: Comparação dos melhores times

  new Chart(ctx4, {
    type: 'radar',
    data: {
      labels: top8Pontos.map((time) => time.time),
      datasets: [{
        label: 'Pontos',
        data: top8Pontos.map((time) => time.pts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)'
      }, {
        label: 'Saldo de gols',
        data: top8Pontos.map((time) => time.saldoGols ?? 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)'
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Comparação dos melhores times' } }
    }
  });

  //Gráfico 5: Proporção de times classificados vs eliminados 
  
  new Chart(ctx5, {
    type: 'pie',
    data: {
      labels: ['Times que passaram', 'Times eliminados'],
      datasets: [{
        label: 'Próxima fase',
        data: [8,8 - timesClassificados.length],
        backgroundColor: ['#12264b', '#5374e0']
      }]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: 'Times que passaram para a próxima fase' } }
    }
  });
}
