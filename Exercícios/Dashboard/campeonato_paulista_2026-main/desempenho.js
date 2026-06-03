// desempenho
export function desempenho(times) {
  return times.map(t => { //map ajuda na lista
    let pontos = (t.v * 3) + t.e
    let max = t.j * 3

    return {
      time: t.time,
      desempenho: ((pontos / max) * 100).toFixed(2) + '%'
    }
  })
}

//vitoria = 3 pontos, empate = 1 ponto