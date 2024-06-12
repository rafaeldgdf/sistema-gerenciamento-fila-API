import { AppDataSource } from './data-source';
import Fila from './entities/Fila';

async function initFilas() {
  const filaRepository = AppDataSource.getRepository(Fila);
  const filasExistentes = await filaRepository.find();

  if (filasExistentes.length === 0) {
    const filas = Array.from({ length: 10 }, (_, i) => {
      const fila = new Fila();
      fila.nome = `Fila ${i + 1}`;
      fila.capacidade = i + 1;
      fila.priority = i + 1;
      fila.clientes = [];
      return fila;
    });

    await filaRepository.save(filas);
    console.log('Filas criadas com sucesso');
  } else {
    console.log('Filas já existem');
  }
}

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    initFilas();
  })
  .catch((error) => console.error('Error during Data Source initialization:', error));
