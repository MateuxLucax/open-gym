import { Gender } from './gender';

export type Instructor = {
  id: number;
  name: string;
  qualification: string;
  gender: Gender;
  wage: number;
};

export const defaultInstructors: Instructor[] = [
  {
    id: 1,
    name: 'Carlos Silva',
    qualification: 'Personal Trainer',
    gender: Gender.masculino,
    wage: 3000
  },
  {
    id: 2,
    name: 'Ana Pereira',
    qualification: 'Instrutora de Pilates',
    gender: Gender.feminino,
    wage: 3500
  },
  {
    id: 3,
    name: 'Roberto Santos',
    qualification: 'Instrutor de Funcional',
    gender: Gender.masculino,
    wage: 3200
  }
];
