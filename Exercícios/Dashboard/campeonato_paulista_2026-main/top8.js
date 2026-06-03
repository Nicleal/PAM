export function top8(times) {

  let copia = [...times];
  let melhores = [];

  for (let i = 0; i < 8; i++) {

    let maior = copia[0];
    let pos = 0;

    for (let j = 1; j < copia.length; j++) {
      if (copia[j].pts > maior.pts) {
        maior = copia[j];
        pos = j;
      }
    }

    melhores.push(maior); // add o com mais pontos da vez
    copia.splice(pos, 1); //remove o com mais pontos da lista para nn repetir ele
  }

  return melhores;
}