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
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Gender } from '../../models/gender';
import { Instructor, defaultInstructors } from '../../models/instructor';
import HeaderTitle from '../../components/headerTitle';

export default function InstructorsPage() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>();
  const [qualification, setQualification] = useState('');
  const [wage, setWage] = useState(0);
  const [instructors, setInstructors] =
    useState<Instructor[]>(defaultInstructors);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  function handleAddInstructor() {
    if (!name) return;
    if (!gender) return;
    if (!qualification) return;

    const newInstructor: Instructor = {
      id: instructors.length + 1,
      name,
      gender,
      qualification: qualification,
      wage: wage
    };

    setInstructors((prevInstructors) => [...prevInstructors, newInstructor]);
    setName('');
    setGender(undefined);
    setQualification('');
    setWage(0);
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

  const sortedInstructors = [...instructors].sort((a, b) => {
    if (sortKey && sortOrder !== 'none') {
      const aValue = a[sortKey as keyof Instructor];
      const bValue = b[sortKey as keyof Instructor];

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

  async function removeInstructor(id: number) {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover este instrutor?'
    );
    if (!confirmed) return;
    const updatedInstructors = instructors.filter(
      (instructor) => instructor.id !== id
    );
    setInstructors(updatedInstructors);
  }

  return (
    <>
      <section className="flex mb-8">
        <HeaderTitle>Instrutores</HeaderTitle>
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
              <TableHeaderCell onClick={() => handleSort('qualification')}>
                <span className="flex flex-row align-middle gap-4">
                  Qualificação
                  {renderSortIcon('qualification')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('gender')}>
                <span className="flex flex-row align-middle gap-4">
                  Gênero
                  {renderSortIcon('gender')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('wage')}>
                <span className="flex flex-row align-middle gap-4">
                  Salário
                  {renderSortIcon('wage')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedInstructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.id}</TableCell>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.qualification}</TableCell>
                <TableCell>{instructor.gender}</TableCell>
                <TableCell>{formatMoney(instructor.wage)}</TableCell>
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
                    onClick={() => removeInstructor(instructor.id)}
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
                <TextInput
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="Qualificação..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <Select
                  placeholder="Genero..."
                  value={String(gender)}
                  onValueChange={(value) => {
                    if (value === 'Masculino') setGender(Gender.masculino);
                    if (value === 'Feminino') setGender(Gender.feminino);
                    if (value === 'Outro') setGender(Gender.outro);
                  }}
                >
                  <SelectItem value={String('Masculino')}>Masculino</SelectItem>
                  <SelectItem value={String('Feminino')}>Feminino</SelectItem>
                  <SelectItem value={String('Outro')}>Outro</SelectItem>
                </Select>
              </TableFooterCell>
              <TableFooterCell>
                <NumberInput
                  onChange={(e) => setWage(Number(e.target.value))}
                  icon={CurrencyDollarIcon}
                  placeholder="Salário..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <Button
                  variant="secondary"
                  icon={PlusIcon}
                  onClick={handleAddInstructor}
                >
                  Cadastrar instrutor
                </Button>
              </TableFooterCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Card>
    </>
  );
}
