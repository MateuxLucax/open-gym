import { Equipment, EquipmentType } from './equipment';
import { Gender } from './gender';
import { Instructor } from './instructor';

export type Activity = {
  id: number;
  name: string;
  maxMembers: number;
  price: number;
  equipment: Equipment;
  instructor: Instructor;
};

export const defaultActivities: Activity[] = [
  {
    id: 1,
    name: 'Musculação',
    maxMembers: 10,
    price: 100,
    equipment: {
      id: 1,
      name: 'Banco de supino',
      type: EquipmentType.musculacao,
      monthlyMaintenanceCost: 50
    },
    instructor: {
      id: 1,
      name: 'Carlos Silva',
      qualification: 'Personal Trainer',
      gender: Gender.masculino,
      wage: 3000
    }
  },
  {
    id: 2,
    name: 'Pilates',
    maxMembers: 8,
    price: 150,
    equipment: {
      id: 2,
      name: 'Reformer',
      type: EquipmentType.funcional,
      monthlyMaintenanceCost: 70
    },
    instructor: {
      id: 2,
      name: 'Ana Pereira',
      qualification: 'Instrutora de Pilates',
      gender: Gender.feminino,
      wage: 3500
    }
  },
  {
    id: 3,
    name: 'Funcional',
    maxMembers: 12,
    price: 120,
    equipment: {
      id: 3,
      name: 'Kettlebell',
      type: EquipmentType.funcional,
      monthlyMaintenanceCost: 30
    },
    instructor: {
      id: 3,
      name: 'Roberto Santos',
      qualification: 'Instrutor de Funcional',
      gender: Gender.masculino,
      wage: 3200
    }
  }
];
