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
import Spacer from '../../components/spacer';
import {
  CurrencyDollarIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

type Product = {
  name: string;
  price: number;
  sold: number;
};

const defaultProducts: Product[] = [
  {
    name: 'Nike Revolution 6',
    price: 250,
    sold: 4
  },
  {
    name: 'Camisa Adidas Aeroready',
    price: 150,
    sold: 7
  },
  {
    name: 'Camisa Nike Dri-Fit Academy',
    price: 125,
    sold: 3
  },
  {
    name: 'Água',
    price: 5,
    sold: 69
  },
  {
    name: 'Bola de futebol',
    price: 100,
    sold: 7
  },
  {
    name: 'Tênis Adidas Ultraboost',
    price: 300,
    sold: 12
  },
  {
    name: 'Meião de Futebol Nike',
    price: 20,
    sold: 25
  },
  {
    name: 'Raquete de Tênis Head',
    price: 150,
    sold: 8
  },
  {
    name: 'Boné Puma',
    price: 30,
    sold: 15
  },
  {
    name: 'Luvas de Goleiro Reusch',
    price: 80,
    sold: 5
  }
];

export default function ProductsDashboard() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  function handleAddProduct(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const newProduct: Product = {
      name,
      price: Number(price),
      sold: 0
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts);
    setName('');
    setPrice('0');
  }

  return (
    <>
      <Title className="text-5xl mb-8 font-black">Produtos</Title>
      <Card className="max-w">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Preço</TableHeaderCell>
              <TableHeaderCell>Vendido</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
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
