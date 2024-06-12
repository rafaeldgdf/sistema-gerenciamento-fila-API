import { AppDataSource } from './data-source';
import Fila from './entities/Fila';

const insertFilas = async () => {
  await AppDataSource.initialize();

  const filaRepository = AppDataSource.getRepository(Fila);

  for (let i = 1; i <= 10; i++) {
    const fila = filaRepository.create({
      nome: `Fila ${i}`,
      capacidade: i,
      priority: i
    });

    await filaRepository.save(fila);
  }

  console.log('Filas inseridas com sucesso');
};

insertFilas().catch((error) => console.log(error));