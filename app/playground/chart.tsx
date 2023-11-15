'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

const data = [
  {
    Month: 'Jan 21',
    Sales: 2890,
    Profit: 2400
  },
  {
    Month: 'Feb 21',
    Sales: 1890,
    Profit: 1390
  },
  {
    Month: 'Mar 21',
    Sales: 4230,
    Profit: 3000
  },
  {
    Month: 'Apr 21',
    Sales: 3800,
    Profit: 2400
  },
  {
    Month: 'May 21',
    Sales: 1290,
    Profit: 760
  },
  {
    Month: 'Jun 21',
    Sales: 1080,
    Profit: 230
  }
];

export default function Example() {
  return (
    <Card className="mt-8">
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['Sales', 'Profit']}
        index="Month"
        colors={['indigo', 'fuchsia']}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat('us').format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
