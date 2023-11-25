export type Product = {
  id: number;
  name: string;
  price: number;
  sold: number;
  inStock: number;
};

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Nike Revolution 6',
    price: 250,
    sold: 4,
    inStock: 10
  },
  {
    id: 2,
    name: 'Camisa Adidas Aeroready',
    price: 150,
    sold: 7,
    inStock: 20
  },
  {
    id: 3,
    name: 'Camisa Nike Dri-Fit Academy',
    price: 125,
    sold: 3,
    inStock: 15
  },
  {
    id: 4,
    name: 'Água',
    price: 5,
    sold: 69,
    inStock: 100
  },
  {
    id: 5,
    name: 'Bola de futebol',
    price: 100,
    sold: 7,
    inStock: 20
  },
  {
    id: 6,
    name: 'Tênis Adidas Ultraboost',
    price: 300,
    sold: 12,
    inStock: 25
  },
  {
    id: 7,
    name: 'Meião de Futebol Nike',
    price: 20,
    sold: 25,
    inStock: 50
  },
  {
    id: 8,
    name: 'Raquete de Tênis Head',
    price: 150,
    sold: 8,
    inStock: 15
  },
  {
    id: 9,
    name: 'Boné Puma',
    price: 30,
    sold: 15,
    inStock: 30
  },
  {
    id: 10,
    name: 'Luvas de Goleiro Reusch',
    price: 80,
    sold: 5,
    inStock: 10
  }
];
