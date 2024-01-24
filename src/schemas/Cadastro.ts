import { z } from 'zod';

export const SPessoas = z.array(
  z.object({
    id: z.string(),
    nome: z.string(),
  })
);
