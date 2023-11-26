export type Equipment = {
  id: number;
  name: string;
  type: EquipmentType;
  monthlyMaintenanceCost: number;
};

export enum EquipmentType {
  cardio = 'Cardio',
  musculacao = 'Musculação',
  funcional = 'Funcional'
}

export const defaultEquipments: Equipment[] = [
  {
    id: 1,
    name: 'Esteira',
    type: EquipmentType.cardio,
    monthlyMaintenanceCost: 100
  },
  {
    id: 2,
    name: 'Bicicleta ergométrica',
    type: EquipmentType.cardio,
    monthlyMaintenanceCost: 50
  },
  {
    id: 3,
    name: 'Banco de supino',
    type: EquipmentType.musculacao,
    monthlyMaintenanceCost: 10
  },
  {
    id: 4,
    name: 'Barra de halteres',
    type: EquipmentType.musculacao,
    monthlyMaintenanceCost: 5
  },
  {
    id: 5,
    name: 'Kettlebell',
    type: EquipmentType.funcional,
    monthlyMaintenanceCost: 20
  }
];
