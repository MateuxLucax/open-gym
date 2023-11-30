'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';
import { formatMoney } from '../utils';

export const data = [
  {
    Mês: 'Jan 23',
    Entrada: 16584.04,
    Saída: 5349.12
  },
  {
    Mês: 'Fev 23',
    Entrada: 19382.54,
    Saída: 6238.32
  },
  {
    Mês: 'Marc 23',
    Entrada: 12230.98,
    Saída: 5023.47
  },
  {
    Mês: 'Abr 23',
    Entrada: 14230.21,
    Saída: 6980.35
  },
  {
    Mês: 'Mai 23',
    Entrada: 13230.54,
    Saída: 6980.81
  },
  {
    Mês: 'Jun 23',
    Entrada: 13890.17,
    Saída: 3400.63
  },
  {
    Mês: 'Jul 23',
    Entrada: 14890.91,
    Saída: 7390.25
  },
  {
    Mês: 'Ago 23',
    Entrada: 18230.25,
    Saída: 3493.64
  },
  {
    Mês: 'Set 23',
    Entrada: 17800.51,
    Saída: 7800.53
  },
  {
    Mês: 'Out 23',
    Entrada: 14290.19,
    Saída: 4360.95
  },
  {
    Mês: 'Nov 23',
    Entrada: 13080.61,
    Saída: 4300.53
  }
];

export default function Example() {
  return (
    <Card className="mt-8">
      <Title>Fluxo de Caixa</Title>
      <Text>Comparção entre Entradas e Entradas</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['Entrada', 'Saída']}
        index="Mês"
        colors={['red', 'blue']}
        valueFormatter={formatMoney}
        yAxisWidth={96}
      />
    </Card>
  );
}
