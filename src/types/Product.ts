
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'joias' | 'acessorios' | 'decoracao' | 'cosmeticos' | 'roupas';
  featured?: boolean;
}
