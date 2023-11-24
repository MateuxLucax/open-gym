'use client';

import {
  BadgeDelta,
  Button,
  Card,
  Flex,
  Grid,
  List,
  ListItem,
  Metric,
  NumberInput,
  ProgressBar,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  TextInput,
  Title
} from '@tremor/react';
import { formatDate, formatPrice } from '../../utils';
import {
  ArchiveBoxIcon,
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  ArrowsUpDownIcon,
  CurrencyDollarIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import HeaderTitle from '../../components/headerTitle';
import DateRange from '../../components/dateRange';
import { Sale, defaultSales } from '../../models/sale';
import { SaleProduct } from '../../models/saleProduct';

export default function SalesDashboard() {
  const [sales, setSales] = useState<Sale[]>(defaultSales);

  const total = sales
    .map((sale) =>
      sale.salesProducts.reduce((acc: number, curr: SaleProduct) => {
        return acc + curr.product.price * curr.quantity;
      }, 0)
    )
    .reduce((acc: number, curr: number) => acc + curr, 0);

  return (
    <>
      <section className="flex flex-row justify-between items-center gap-4 mb-8">
        <HeaderTitle>Vendas</HeaderTitle>
        <DateRange />
      </section>
      <Grid numItems={3} className="gap-6 mb-6">
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Total no período</Text>
              <Metric>{formatPrice(total)}</Metric>
            </div>
            <BadgeDelta deltaType="moderateIncrease">8.3%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Produtos vendidos no período</Text>
              <Metric>
                {sales
                  .map((sale) => sale.salesProducts.length)
                  .reduce((acc, curr) => acc + curr, 0)}
              </Metric>
            </div>
            <BadgeDelta deltaType="unchanged">1.3%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Membros que compraram no período</Text>
              <Metric>
                {
                  sales
                    .map((sale) => sale.member)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    ).length
                }
              </Metric>
            </div>
            <BadgeDelta deltaType="moderateDecrease">-15%</BadgeDelta>
          </Flex>
        </Card>
      </Grid>
      <Grid numItemsSm={1} numItemsMd={2} className="gap-6">
        {sales.map((sale, index) => (
          <Card key={index}>
            <header className="flex flex-row px-4">
              <Title>
                #{sale.id} - {formatDate(sale.date)}
              </Title>
              <div className="ml-auto flex gap-4">
                <Button icon={PencilIcon} color="teal" />
                <Button icon={TrashIcon} color="red" />
              </div>
            </header>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Produto</TableHeaderCell>
                  <TableHeaderCell>Quantidade</TableHeaderCell>
                  <TableHeaderCell>Preço</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sale.salesProducts.map((saleProduct) => (
                  <TableRow key={saleProduct.product.name}>
                    <TableCell>{saleProduct.product.name}</TableCell>
                    <TableCell>{saleProduct.quantity}</TableCell>
                    <TableCell>
                      {formatPrice(
                        saleProduct.product.price * saleProduct.quantity
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFoot>
                <TableRow>
                  <TableFooterCell>Total</TableFooterCell>
                  <TableFooterCell>
                    {sale.salesProducts.reduce(
                      (acc: number, curr: SaleProduct) => {
                        return acc + curr.quantity;
                      },
                      0
                    )}
                  </TableFooterCell>
                  <TableFooterCell>
                    {formatPrice(
                      sale.salesProducts.reduce(
                        (acc: number, curr: SaleProduct) => {
                          return acc + curr.product.price * curr.quantity;
                        },
                        0
                      )
                    )}
                  </TableFooterCell>
                </TableRow>
              </TableFoot>
            </Table>
          </Card>
        ))}
      </Grid>
    </>
  );
}
