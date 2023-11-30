'use client';

import {
  Card,
  Metric,
  Text,
  Title,
  BarList,
  Flex,
  Grid,
  BadgeDelta
} from '@tremor/react';
import Chart, { data } from './chart';
import HeaderTitle from '../components/headerTitle';
import DateRange from '../components/dateRange';
import { formatMoney } from '../utils';

export default function DashboardPage() {
  const total = data.reduce(
    (acc, { Saída, Entrada }) => acc + Entrada - Saída,
    0
  );

  return (
    <>
      <section className="flex flex-row justify-between items-center gap-4 mb-8">
        <HeaderTitle>Tela Inicial</HeaderTitle>
        <DateRange />
      </section>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Saldo no período</Text>
              <Metric>{formatMoney(total)}</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">12,74%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Matrículas no período</Text>
              <Metric>{formatMoney(7438.04)}</Metric>
            </div>
            <BadgeDelta deltaType="unchanged">1,30%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Salários no período</Text>
              <Metric>{formatMoney(49350)}</Metric>
            </div>
            <BadgeDelta deltaType="moderateDecrease">-30,00%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Vendas no período</Text>
              <Metric>{formatMoney(12000)}</Metric>
            </div>
            <BadgeDelta deltaType="unchanged">2,59%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Produtos vendidos no período</Text>
              <Metric>{124}</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">12,53%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Membros matrículados</Text>
              <Metric>{34}</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">12,00%</BadgeDelta>
          </Flex>
        </Card>
      </Grid>
      <Chart />
    </>
  );
}
