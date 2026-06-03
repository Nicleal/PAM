function normalizarClassificado(valor) {
  if (typeof valor === 'boolean') return valor;

  return ['sim', 'true', '1', 's', 'yes', 'y', 'classificado', 'passou'].includes(
    String(valor ?? '').trim().toLowerCase()
  );
}

const fallbackTimes = [
  { time: 'São Paulo', pts: 18, gp: 12, saldoGols: 9, classificado: true },
  { time: 'Corinthians', pts: 16, gp: 10, saldoGols: 7, classificado: true },
  { time: 'Palmeiras', pts: 15, gp: 8, saldoGols: 6, classificado: true },
  { time: 'Santos', pts: 14, gp: 9, saldoGols: 5, classificado: false },
  { time: 'Flamengo', pts: 13, gp: 11, saldoGols: 4, classificado: false },
  { time: 'Grêmio', pts: 12, gp: 8, saldoGols: 3, classificado: false },
  { time: 'Vasco', pts: 11, gp: 7, saldoGols: 2, classificado: false },
  { time: 'Bahia', pts: 10, gp: 6, saldoGols: 1, classificado: false }
];

async function pegarDados() {
  try {
    const resp = await fetch('http://localhost:3000/times');

    if (!resp.ok) {
      throw new Error(`Erro HTTP: ${resp.status}`);
    }

    const times = await resp.json();

    const timesFormatados = times.map((elemento) => ({
      time: elemento.time,
      pts: Number(elemento.pts) || 0,
      gp: Number(elemento.gp ?? 0),
      saldoGols: Number(elemento.saldoGols ?? elemento.gp ?? 0),
      classificado: normalizarClassificado(elemento.classificado)
    }));

    return { times: timesFormatados };
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);

    return {
      times: fallbackTimes.map((item) => ({
        time: item.time,
        pts: Number(item.pts) || 0,
        gp: Number(item.gp ?? 0),
        saldoGols: Number(item.saldoGols ?? item.gp ?? 0),
        classificado: normalizarClassificado(item.classificado)
      }))
    };
  }
}

export { pegarDados };