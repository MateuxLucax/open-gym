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
  BackspaceIcon,
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [member, setMember] = useState<Member | undefined>();
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(0);
  const [sale, setSale] = useState<Sale | undefined>();

  function addProductToSale() {
    if (!product) {
      return;
    }
    const newSaleProduct: SaleProduct = {
      product,
      quantity
    };

    if (!sale) {
      const newSale: Sale = {
        id: sales.length + 1,
        date: date || new Date(),
        salesProducts: [newSaleProduct],
        member: member || defaultMembers[0]
      };
      setSale(newSale);
      setProduct(undefined);
      setQuantity(0);
      return;
    }

    const updatedSale = {
      ...sale,
      salesProducts: [...sale.salesProducts, newSaleProduct]
    };
    setSale(updatedSale);
    setProduct(undefined);
    setQuantity(0);
  }

  function removeProductFromSale(id: number) {
    if (!sale) {
      return;
    }
    const updatedSale = {
      ...sale,
      salesProducts: sale.salesProducts.filter(
        (saleProduct) => saleProduct.product.id !== id
      )
    };
    setSale(updatedSale);
  }

  function addSaleToSales() {
    if (!sale) {
      return;
    }
    const updatedSales = [...sales, sale];
    setSales(updatedSales);
    resetSale();
  }

  function resetSale() {
    setSale(undefined);
    setProduct(undefined);
    setQuantity(0);
    setDate(undefined);
    setMember(undefined);
  }

  const total = sales
    .map((sale) =>
      sale.salesProducts.reduce((acc: number, curr: SaleProduct) => {
        return acc + curr.product.price * curr.quantity;
      }, 0)
    )
    .reduce((acc: number, curr: number) => acc + curr, 0);

  const soldProducts = sales
    .map((sale) => sale.salesProducts.length)
    .reduce((acc, curr) => acc + curr, 0);

  const boughtMembers = sales
    .map((sale) => sale.member)
    .filter((value, index, self) => self.indexOf(value) === index).length;

  async function removeSale(id: number) {
    const confirmed = window.confirm('Deseja remover a venda?');
    if (!confirmed) return;
    const updatedSales = sales.filter((sale) => sale.id !== id);
    setSales(updatedSales);
  }

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
              <Metric>{soldProducts}</Metric>
            </div>
            <BadgeDelta deltaType="unchanged">1.3%</BadgeDelta>
          </Flex>
        </Card>
        <Card>
          <Flex alignItems="start">
            <div>
              <Text>Membros que compraram no período</Text>
              <Metric>{boughtMembers}</Metric>
            </div>
            <BadgeDelta deltaType="moderateDecrease">-15%</BadgeDelta>
          </Flex>
        </Card>
      </Grid>
      <Grid numItemsSm={1} numItemsMd={2} className="gap-6">
        <Card className="max-h-96 overflow-y-auto">
          <header className="flex flex-row px-4 items-center">
            <div>
              <Title className="font-normal flex items-center mr-1">
                #{sales.length + 1} -
              </Title>
            </div>
            <div>
              <DatePicker
                onValueChange={(value) => setDate(value as Date)}
                locale={ptBR}
                value={date}
                placeholder="Vendido em..."
              />
            </div>
            <div className="ml-auto flex gap-4">
              <Button
                variant="secondary"
                icon={BackspaceIcon}
                color="gray"
                tooltip="Limpar"
                onClick={resetSale}
              >
                Limpar
              </Button>
              <Button
                variant="secondary"
                icon={PlusIcon}
                color="teal"
                tooltip="Salvar"
                onClick={addSaleToSales}
              >
                Salvar
              </Button>
            </div>
          </header>
          <section className="p-4">
            <Select
              placeholder="Membro..."
              value={String(member?.id)}
              onValueChange={(value) => {
                const member = defaultMembers.find(
                  (member) => member.id === Number(value)
                );
                if (!member) {
                  return;
                }
                setMember(member);
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
                <TableHeaderCell></TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Select
                    placeholder="Produtos..."
                    value={String(product?.id)}
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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    icon={ArchiveBoxIcon}
                    placeholder="Quantidade..."
                  />
                </TableCell>
                <TableCell>
                  {formatPrice(product ? product.price * quantity : 0)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="light"
                    icon={PlusIcon}
                    color="teal"
                    tooltip="Adicionar"
                    onClick={addProductToSale}
                  />
                </TableCell>
              </TableRow>
              {sale?.salesProducts.map((saleProduct) => (
                <TableRow key={saleProduct.product.name}>
                  <TableCell>{saleProduct.product.name}</TableCell>
                  <TableCell>{saleProduct.quantity}</TableCell>
                  <TableCell>
                    {formatPrice(
                      saleProduct.product.price * saleProduct.quantity
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="light"
                      icon={TrashIcon}
                      color="red"
                      tooltip="Remover"
                      onClick={() => {
                        removeProductFromSale(saleProduct.product.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableFooterCell>Total</TableFooterCell>
                <TableFooterCell></TableFooterCell>
                <TableFooterCell></TableFooterCell>
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
                  onClick={() => removeSale(sale.id)}
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
