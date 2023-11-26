'use client';

import {
  Button,
  Card,
  NumberInput,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput
} from '@tremor/react';
import { formatMoney } from '../../utils';
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  ArrowsUpDownIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import HeaderTitle from '../../components/headerTitle';
import {
  Equipment,
  EquipmentType,
  defaultEquipments
} from '../../models/equipment';

export default function EquipmentPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState<EquipmentType>();
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [equipments, setEquipments] = useState<Equipment[]>(defaultEquipments);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  function handleAddEquipment() {
    if (!name) return;
    if (!type) return;
    if (!monthlyCost) return;

    const newEquipment: Equipment = {
      id: equipments.length + 1,
      name,
      type: type,
      monthlyMaintenanceCost: monthlyCost
    };

    setEquipments((prevEquipments) => [...prevEquipments, newEquipment]);
    setName('');
    setType(undefined);
    setMonthlyCost(0);
  }

  function renderSortIcon(key: string) {
    if (sortKey === key) {
      if (sortOrder === 'asc') {
        return (
          <ArrowSmallUpIcon className="h-6 hover:cursor-pointer hover:opacity-80" />
        );
      } else if (sortOrder === 'desc') {
        return (
          <ArrowSmallDownIcon className="h-6 hover:cursor-pointer hover:opacity-80" />
        );
      }
    }
    return (
      <ArrowsUpDownIcon className="h-6 hover:cursor-pointer hover:opacity-80" />
    );
  }

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortOrder((prevOrder) => {
        if (prevOrder === 'asc') return 'desc';
        if (prevOrder === 'desc') return 'none';
        return 'asc';
      });
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  }

  const sortedEquipments = [...equipments].sort((a, b) => {
    if (sortKey && sortOrder !== 'none') {
      const aValue = a[sortKey as keyof Equipment];
      const bValue = b[sortKey as keyof Equipment];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      }

      const stringValueA = String(aValue);
      const stringValueB = String(bValue);

      return sortOrder === 'asc'
        ? stringValueA.localeCompare(stringValueB)
        : stringValueB.localeCompare(stringValueA);
    }
    return 0;
  });

  async function removeEquipment(id: number) {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover este equipamento?'
    );
    if (!confirmed) return;
    const updatedEquipments = equipments.filter(
      (equipment) => equipment.id !== id
    );
    setEquipments(updatedEquipments);
  }

  return (
    <>
      <section className="flex mb-8">
        <HeaderTitle>Equipamentos</HeaderTitle>
      </section>
      <Card className="max-w">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell onClick={() => handleSort('id')}>
                <span className="flex flex-row align-middle gap-4">
                  #{renderSortIcon('id')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('name')}>
                <span className="flex flex-row align-middle gap-4">
                  Nome
                  {renderSortIcon('name')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('type')}>
                <span className="flex flex-row align-middle gap-4">
                  Tipo
                  {renderSortIcon('type')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell
                onClick={() => handleSort('monthlyMaintenanceCost')}
              >
                <span className="flex flex-row align-middle gap-4">
                  Manutenção mensal
                  {renderSortIcon('monthlyMaintenanceCost')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEquipments.map((equipment) => (
              <TableRow key={equipment.id}>
                <TableCell>{equipment.id}</TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.type}</TableCell>
                <TableCell>
                  {formatMoney(equipment.monthlyMaintenanceCost)}
                </TableCell>
                <TableCell className="flex flex-row gap-4">
                  <Button
                    variant="light"
                    color="teal"
                    icon={PencilIcon}
                    tooltip="Alterar"
                  />
                  <Button
                    variant="light"
                    color="red"
                    icon={TrashIcon}
                    tooltip="Remover"
                    onClick={() => removeEquipment(equipment.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableFooterCell></TableFooterCell>
              <TableFooterCell>
                <TextInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <Select
                  placeholder="Tipo..."
                  value={String(type)}
                  onValueChange={(value) => {
                    if (value === 'Cardio') setType(EquipmentType.cardio);
                    if (value === 'Musculação')
                      setType(EquipmentType.musculacao);
                    if (value === 'Funcional') setType(EquipmentType.funcional);
                  }}
                >
                  <SelectItem value={String('Cardio')}>Cardio</SelectItem>
                  <SelectItem value={String('Musculação')}>
                    Musculação
                  </SelectItem>
                  <SelectItem value={String('Funcional')}>Funcional</SelectItem>
                </Select>
              </TableFooterCell>
              <TableFooterCell>
                <NumberInput
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(Number(e.target.value))}
                  placeholder="Manutenção mensal..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <Button
                  variant="secondary"
                  icon={PlusIcon}
                  onClick={handleAddEquipment}
                >
                  Cadastrar equipamento
                </Button>
              </TableFooterCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Card>
    </>
  );
}
