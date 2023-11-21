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
  TextInput,
  Title
} from '@tremor/react';
import { formatPrice } from '../../components/utils';
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

type Product = {
  name: string;
  price: number;
  sold: number;
  inStock: number;
};

const defaultProducts: Product[] = [
  {
    name: 'Nike Revolution 6',
    price: 250,
    sold: 4,
    inStock: 10
  },
  {
    name: 'Camisa Adidas Aeroready',
    price: 150,
    sold: 7,
    inStock: 20
  },
  {
    name: 'Camisa Nike Dri-Fit Academy',
    price: 125,
    sold: 3,
    inStock: 15
  },
  {
    name: 'Água',
    price: 5,
    sold: 69,
    inStock: 100
  },
  {
    name: 'Bola de futebol',
    price: 100,
    sold: 7,
    inStock: 20
  },
  {
    name: 'Tênis Adidas Ultraboost',
    price: 300,
    sold: 12,
    inStock: 25
  },
  {
    name: 'Meião de Futebol Nike',
    price: 20,
    sold: 25,
    inStock: 50
  },
  {
    name: 'Raquete de Tênis Head',
    price: 150,
    sold: 8,
    inStock: 15
  },
  {
    name: 'Boné Puma',
    price: 30,
    sold: 15,
    inStock: 30
  },
  {
    name: 'Luvas de Goleiro Reusch',
    price: 80,
    sold: 5,
    inStock: 10
  }
];

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

  return (
    <>
      <section className="flex flex-row justify-between items-center gap-4 mb-8">
        <HeaderTitle>Produtos</HeaderTitle>
        <DateRange />
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
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.inStock}</TableCell>
                <TableCell>{product.sold}</TableCell>
                <TableCell className="flex flex-row gap-4">
                  <Button color="teal" icon={PencilIcon} tooltip="Alterar" />
                  <Button color="red" icon={TrashIcon} tooltip="Remover" />
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
                <Button icon={PlusIcon} onClick={handleAddProduct}>
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
