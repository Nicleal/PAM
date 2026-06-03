export function topSaldo(times) {

  for (let i = 0; i < times.length; i++) {
    times[i].sg = times[i].gp - times[i].gc;
  }

  let copia = [...times];
  let melhores = [];

  for (let i = 0; i < 4; i++) {

    let maior = copia[0];
    let pos = 0;

    for (let j = 1; j < copia.length; j++) {
      if (copia[j].sg > maior.sg) {
        maior = copia[j];
        pos = j;
      }
    }

    melhores.push(maior); // add o com mais gols da vez
    copia.splice(pos, 1); // remove o com mais gols da lista para nn repetir ele
  }

  return melhores;
}