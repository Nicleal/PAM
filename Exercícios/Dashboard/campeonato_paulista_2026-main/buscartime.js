export function buscarTime(nome, times) {
  for (let i = 0; i < times.length; i++) {
    if (times[i].time.toLowerCase() === nome.toLowerCase()) {
      return times[i];
    }
  }
  return "Time não encontrado";
}