'use client';

import { ptBR } from 'date-fns/locale';
import {
  BadgeDelta,
  Button,
  Card,
  DatePicker,
  Flex,
  Grid,
  Metric,
  NumberInput,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput
} from '@tremor/react';
import DateRange from '../../components/dateRange';
import HeaderTitle from '../../components/headerTitle';
import {
  CashFlow,
  CashFlowType,
  defaultCashFlows
} from '../../models/cash-flow';
import { useState } from 'react';
import { formatDate, formatMoney } from '../../utils';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CashFlowPage() {
  const [cashFlow, setCashFlow] = useState<CashFlow[]>(defaultCashFlows);
  const totalIncome = cashFlow.reduce((acc, curr) => acc + curr.amount, 0);

  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<CashFlowType>(CashFlowType.Income);

  return (
    <>
      <section className="flex flex-row justify-between items-center gap-4 mb-8">
        <HeaderTitle>Fluxo de Caixa</HeaderTitle>
        <DateRange />
      </section>
      <Grid numItems={3} className="mb-6 gap-6">
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Total em caixa</Text>
              <Metric>{formatMoney(totalIncome)}</Metric>
            </div>
          </Flex>
        </Card>
      </Grid>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell>Data</TableHeaderCell>
              <TableHeaderCell>Descrição</TableHeaderCell>
              <TableHeaderCell>Quantidade</TableHeaderCell>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashFlow.map((flow) => (
              <TableRow key={flow.id}>
                <TableCell>{flow.id}</TableCell>
                <TableCell>{formatDate(flow.date)}</TableCell>
                <TableCell>{flow.description}</TableCell>
                <TableCell>{formatMoney(flow.amount)}</TableCell>
                <TableCell>
                  <BadgeDelta
                    className="cursor-pointer select-none"
                    deltaType={
                      flow.type == CashFlowType.Expense
                        ? 'moderateDecrease'
                        : 'moderateIncrease'
                    }
                    tooltip={flow.type}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="light"
                    icon={TrashIcon}
                    color="red"
                    tooltip="Remover"
                    onClick={() => {
                      const confirmed = confirm(
                        'Deseja remover o fluxo de caixa?'
                      );
                      if (!confirmed) return;
                      const newCashFlow = cashFlow.filter(
                        (item) => item.id != flow.id
                      );
                      setCashFlow(newCashFlow);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableFooterCell></TableFooterCell>
              <TableFooterCell>
                <DatePicker
                  onValueChange={(value) => setDate(value as Date)}
                  locale={ptBR}
                  value={date}
                  enableYearNavigation
                  placeholder="Data..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <TextInput
                  value={description}
                  onValueChange={setDescription}
                  placeholder="Descrição..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <NumberInput
                  value={amount}
                  onValueChange={setAmount}
                  placeholder="Quantidade..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <BadgeDelta
                  className="cursor-pointer select-none"
                  deltaType={
                    type == CashFlowType.Expense
                      ? 'moderateDecrease'
                      : 'moderateIncrease'
                  }
                  tooltip={type}
                  onClick={() =>
                    setType(
                      type == CashFlowType.Expense
                        ? CashFlowType.Income
                        : CashFlowType.Expense
                    )
                  }
                />
              </TableFooterCell>
              <TableFooterCell>
                <Button
                  variant="secondary"
                  icon={PlusIcon}
                  color="teal"
                  tooltip="Adicionar"
                  onClick={() => {
                    const newCashFlow = [
                      ...cashFlow,
                      {
                        id: cashFlow.length + 1,
                        date,
                        description,
                        amount: type == CashFlowType.Expense ? -amount : amount,
                        type
                      }
                    ];
                    setCashFlow(newCashFlow);
                    setDate(new Date());
                    setDescription('');
                    setAmount(0);
                    setType(CashFlowType.Income);
                  }}
                >
                  Adicionar
                </Button>
              </TableFooterCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Card>
    </>
  );
}
