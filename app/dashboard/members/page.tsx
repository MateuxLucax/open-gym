'use client';

import { ptBR } from 'date-fns/locale';
import {
  Button,
  Card,
  DatePicker,
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
import { formatDate } from '../../utils';
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
import { Member, defaultMembers } from '../../models/member';
import { Gender } from '../../models/gender';

export default function MembersPage() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>();
  const [birthDate, setBirthDate] = useState(new Date(2000, 1, 1));
  const [members, setMembers] = useState<Member[]>(defaultMembers);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  function handleAddMember() {
    if (!name) return;
    if (!gender) return;
    if (!birthDate) return;

    const newMember: Member = {
      id: members.length + 1,
      name,
      gender,
      birthDate
    };

    setMembers((prevMembers) => [...prevMembers, newMember]);
    setName('');
    setGender(undefined);
    setBirthDate(new Date(2000, 1, 1));
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

  const sortedMembers = [...members].sort((a, b) => {
    if (sortKey && sortOrder !== 'none') {
      const aValue = a[sortKey as keyof Member];
      const bValue = b[sortKey as keyof Member];

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

  async function removeMember(id: number) {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover este membro?'
    );
    if (!confirmed) return;
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
  }

  return (
    <>
      <section className="flex mb-8">
        <HeaderTitle>Membros</HeaderTitle>
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
              <TableHeaderCell onClick={() => handleSort('birthDate')}>
                <span className="flex flex-row align-middle gap-4">
                  Data de nascimento
                  {renderSortIcon('birthDate')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('gender')}>
                <span className="flex flex-row align-middle gap-4">
                  Gênero
                  {renderSortIcon('gender')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{formatDate(member.birthDate)}</TableCell>
                <TableCell>{member.gender}</TableCell>
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
                    onClick={() => removeMember(member.id)}
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
                <DatePicker
                  onValueChange={(value) => setBirthDate(value as Date)}
                  locale={ptBR}
                  value={birthDate}
                  enableYearNavigation
                  placeholder="Nascido em..."
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
                <Button
                  variant="secondary"
                  icon={PlusIcon}
                  onClick={handleAddMember}
                >
                  Cadastrar membro
                </Button>
              </TableFooterCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Card>
    </>
  );
}
