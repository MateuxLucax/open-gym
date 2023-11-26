import { Gender } from './gender';

export type Member = {
  id: number;
  name: string;
  birthDate: Date;
  gender: Gender;
};

export const defaultMembers: Member[] = [
  {
    id: 1,
    name: 'João Silva',
    birthDate: new Date(1990, 5, 15),
    gender: Gender.masculino
  },
  {
    id: 2,
    name: 'Maria Santos',
    birthDate: new Date(1985, 7, 20),
    gender: Gender.feminino
  },
  {
    id: 3,
    name: 'Alex Pereira',
    birthDate: new Date(1992, 11, 30),
    gender: Gender.outro
  }
];
