'use client';

import {
  Button,
  Card,
  NumberInput,
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
import { formatPrice } from '../../utils';
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
import { Product, defaultProducts } from '../../models/product';

export default function ProductsDashboard() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [stock, setStock] = useState('0');
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  function handleAddProduct(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const newProduct: Product = {
      id: products.length + 1,
      name,
      price: Number(price),
      inStock: Number(stock),
      sold: 0
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);
    setName('');
    setPrice('0');
    setStock('0');
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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortKey && sortOrder !== 'none') {
      const aValue = a[sortKey as keyof Product];
      const bValue = b[sortKey as keyof Product];

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

  async function removeProduct(id: number) {
    const confirmed = window.confirm(
      'Tem certeza que deseja remover este produto?'
    );
    if (!confirmed) return;
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  }

  return (
    <>
      <section className="flex mb-8">
        <HeaderTitle>Produtos</HeaderTitle>
      </section>
      <Card className="max-w">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell onClick={() => handleSort('name')}>
                <span className="flex flex-row align-middle gap-4">
                  Nome
                  {renderSortIcon('name')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('price')}>
                <span className="flex flex-row align-middle gap-4">
                  Preço
                  {renderSortIcon('price')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('inStock')}>
                <span className="flex flex-row align-middle gap-4">
                  Estoque
                  {renderSortIcon('inStock')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('sold')}>
                <span className="flex flex-row align-middle gap-4">
                  Vendido
                  {renderSortIcon('sold')}
                </span>
              </TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.inStock}</TableCell>
                <TableCell>{product.sold}</TableCell>
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
                    onClick={() => removeProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableFooterCell>
                <TextInput
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <NumberInput
                  onChange={(e) => setPrice(e.target.value)}
                  icon={CurrencyDollarIcon}
                  placeholder="Preço..."
                />
              </TableFooterCell>
              <TableFooterCell>
                <NumberInput
                  onChange={(e) => setStock(e.target.value)}
                  icon={ArchiveBoxIcon}
                  placeholder="Estoque..."
                />
              </TableFooterCell>
              <TableFooterCell></TableFooterCell>
              <TableFooterCell>
                <Button
                  variant="secondary"
                  icon={PlusIcon}
                  onClick={handleAddProduct}
                >
                  Cadastrar produto
                </Button>
              </TableFooterCell>
            </TableRow>
          </TableFoot>
        </Table>
      </Card>
    </>
  );
}
