export function calcularPontos(times) {
  for (let i = 0; i < times.length; i++) {
    times[i].pts = (times[i].v * 3) + times[i].e;
  }
}