// classificados
//os 8 times classificados
export function classificadoss(times) {
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

    melhores.push(maior);
    copia.splice(pos, 1); 
  }

  return melhores;
}