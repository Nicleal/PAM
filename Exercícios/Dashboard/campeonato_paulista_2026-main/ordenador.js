export function ordenados(times) {
  return [...times].sort((a, b) => {
    let pontosA = (a.v * 3) + a.e
    let pontosB = (b.v * 3) + b.e

    return pontosB - pontosA      //Maiopro Menor
  })
}

