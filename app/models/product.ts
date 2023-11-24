export type Product = {
  name: string;
  price: number;
  sold: number;
  inStock: number;
};

export const defaultProducts: Product[] = [
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
