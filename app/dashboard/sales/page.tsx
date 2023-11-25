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
  Text,
  Title
} from '@tremor/react';
import { formatDate, formatPrice } from '../../utils';
import {
  ArchiveBoxIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import HeaderTitle from '../../components/headerTitle';
import DateRange from '../../components/dateRange';
import { Sale, defaultSales } from '../../models/sale';
import { SaleProduct } from '../../models/saleProduct';
import { Product, defaultProducts } from '../../models/product';
import { Member, defaultMembers } from '../../models/member';

export default function SalesDashboard() {
  const [sales, setSales] = useState<Sale[]>(defaultSales);
  const [products, setProducts] = useState<Product[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [member, setMembers] = useState<Member>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(0);

  function handleAddSale(event: React.FormEvent<HTMLFormElement>) {
    // event.preventDefault();
    // const product = defaultProducts.find(
    //   (product) => product.id === Number(event.target[0].value)
    // );
    // if (!product) {
    //   return;
    // }
    // const newSaleProduct: SaleProduct = {
    //   product,
    //   quantity: Number(event.target[1].value)
    // };
    // const newSale: Sale = {
    //   id: sales.length + 1,
    //   date: new Date(),
    //   salesProducts: [newSaleProduct],
    //   member: 'Membro 1'
    // };
    // const updatedSales = [...sales, newSale];
    // setSales(updatedSales);
  }

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
        <Card>
          <header className="flex flex-row px-4 items-center justify-between">
            <Title className="font-normal flex items-center">
              <span className="mr-1 w-12">#{sales.length + 1} -</span>
              <DatePicker
                onValueChange={(value) => setDate(value as Date)}
                locale={ptBR}
                placeholder="Vendido em..."
              />
            </Title>
          </header>
          <section className="p-4">
            <Select
              placeholder="Membro..."
              onValueChange={(value) => {
                const member = defaultMembers.find(
                  (member) => member.id === Number(value)
                );
                if (!member) {
                  return;
                }
                setMembers(member);
              }}
            >
              {defaultMembers.map((member) => (
                <SelectItem key={member.id} value={String(member.id)}>
                  {member.name}
                </SelectItem>
              ))}
            </Select>
          </section>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Produto</TableHeaderCell>
                <TableHeaderCell>Quantidade</TableHeaderCell>
                <TableHeaderCell>Preço</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select
                    placeholder="Produtos..."
                    onValueChange={(value) => {
                      const product = defaultProducts.find(
                        (product) => product.id === Number(value)
                      );
                      if (!product) {
                        return;
                      }
                      setProduct(product);
                    }}
                  >
                    {defaultProducts.map((product) => (
                      <SelectItem key={product.id} value={String(product.id)}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <NumberInput
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    icon={ArchiveBoxIcon}
                    placeholder="Quantidade..."
                  />
                </TableCell>
                <TableCell>
                  {formatPrice(product ? product.price * quantity : 0)}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableFooterCell>Total</TableFooterCell>
                <TableFooterCell>
                  {/* {sale.salesProducts.reduce(
                      (acc: number, curr: SaleProduct) => {
                        return acc + curr.quantity;
                      },
                      0
                    )} */}
                </TableFooterCell>
                <TableFooterCell>
                  {/* {formatPrice(
                      sale.salesProducts.reduce(
                        (acc: number, curr: SaleProduct) => {
                          return acc + curr.product.price * curr.quantity;
                        },
                        0
                      )
                    )} */}
                </TableFooterCell>
              </TableRow>
            </TableFoot>
          </Table>
        </Card>
        {sales.map((sale, index) => (
          <Card key={index}>
            <header className="flex flex-row px-4 items-center justify-between">
              <Title className="font-normal">
                #{sale.id} - {formatDate(sale.date)}
              </Title>
              <div className="flex gap-4">
                <Button
                  variant="light"
                  icon={PencilIcon}
                  color="teal"
                  tooltip="Alterar"
                />
                <Button
                  variant="light"
                  icon={TrashIcon}
                  color="red"
                  tooltip="Remover"
                />
              </div>
            </header>
            <Title className="p-4 font-bold">Membro: {sale.member.name}</Title>
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
