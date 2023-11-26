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
  CurrencyDollarIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Instructor, defaultInstructors } from '../../models/instructor';
import HeaderTitle from '../../components/headerTitle';
import { Activity, defaultActivities } from '../../models/activity';
import { Equipment, defaultEquipments } from '../../models/equipment';

export default function ActivitiesPage() {
  const [name, setName] = useState('');
  const [maxMembers, setMaxMembers] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [equipment, setEquipment] = useState<Equipment>();
  const [instructor, setInstructor] = useState<Instructor>();
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  function handleAddActivity() {
    if (!name) return;
    if (!maxMembers) return;
    if (!price) return;
    if (!equipment) return;
    if (!instructor) return;

    const newActivity: Activity = {
      id: activities.length + 1,
      name,
      maxMembers,
      price,
      equipment,
      instructor
    };

    setActivities((prevActivities) => [...prevActivities, newActivity]);
    setName('');
    setMaxMembers(0);
    setPrice(0);
    setEquipment(undefined);
    setInstructor(undefined);
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

  const sortedActivities = [...activities].sort((a, b) => {
    if (sortKey && sortOrder !== 'none') {
      const aValue = a[sortKey as keyof Activity];
      const bValue = b[sortKey as keyof Activity];

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

  async function removeActivity(id: number) {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover esta atividade?'
    );
    if (!confirmed) return;
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(updatedActivities);
  }

  return (
    <>
      <section className="flex mb-8">
        <HeaderTitle>Atividades</HeaderTitle>
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
              <TableHeaderCell onClick={() => handleSort('maxMembers')}>
                <span className="flex flex-row align-middle gap-4">
                  Máximo de membros
                  {renderSortIcon('maxMembers')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('price')}>
                <span className="flex flex-row align-middle gap-4">
                  Mensalidade
                  {renderSortIcon('price')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('equipment')}>
                <span className="flex flex-row align-middle gap-4">
                  Equipamento
                  {renderSortIcon('equipment')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('instructor')}>
                <span className="flex flex-row align-middle gap-4">
                  Instrutor
                  {renderSortIcon('instructor')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.maxMembers}</TableCell>
                <TableCell>{formatMoney(activity.price)}</TableCell>
                <TableCell>{activity.equipment.name}</TableCell>
                <TableCell>{activity.instructor.name}</TableCell>
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
                    onClick={() => removeActivity(activity.id)}
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
                <NumberInput
                  value={maxMembers}
                  onChange={(e) => setMaxMembers(Number(e.target.value))}
                  icon={UserGroupIcon}
                  placeholder="Máximo de membros..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <NumberInput
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  icon={CurrencyDollarIcon}
                  placeholder="Mensalidade..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <Select
                  placeholder="Equipamento..."
                  value={String(equipment?.name)}
                  onValueChange={(value) => {
                    const equipment = defaultEquipments.find(
                      (equipment) => equipment.name === value
                    );
                    setEquipment(equipment);
                  }}
                >
                  {defaultEquipments.map((equipment) => (
                    <SelectItem key={equipment.id} value={equipment.name}>
                      {equipment.name}
                    </SelectItem>
                  ))}
                </Select>
              </TableFooterCell>
              <TableFooterCell>
                <Select
                  placeholder="Instrutor..."
                  value={String(instructor?.name)}
                  onValueChange={(value) => {
                    const instructor = defaultInstructors.find(
                      (instructor) => instructor.name === value
                    );
                    setInstructor(instructor);
                  }}
                >
                  {defaultInstructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.name}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </Select>
              </TableFooterCell>
              <TableFooterCell>
                <Button
                  variant="secondary"
                  icon={PlusIcon}
                  onClick={handleAddActivity}
                >
                  Cadastrar atividade
                </Button>
              </TableFooterCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Card>
    </>
  );
}
