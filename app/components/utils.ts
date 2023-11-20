export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
