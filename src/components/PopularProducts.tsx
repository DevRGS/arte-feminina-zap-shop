
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/Product';
import { TrendingUp, Star } from 'lucide-react';

const PopularProducts: React.FC = () => {
  const popularProducts: Product[] = [
    {
      id: '1',
      name: 'Colar Artesanal Dourado',
      description: 'Lindo colar feito à mão com pingente delicado. Peça única e exclusiva, perfeita para ocasiões especiais.',
      price: 89.90,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
      category: 'joias',
      featured: true
    },
    {
      id: '4',
      name: 'Almofada Decorativa Floral',
      description: 'Almofada com estampa floral delicada, feita com tecidos selecionados. Adiciona charme ao ambiente.',
      price: 67.90,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
      category: 'decoracao',
      featured: true
    },
    {
      id: '2',
      name: 'Bolsa de Crochê Premium',
      description: 'Bolsa artesanal em crochê com forro interno. Ideal para o dia a dia com muito estilo e personalidade.',
      price: 125.00,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
      category: 'acessorios'
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-8 h-8 text-pink-500" />
          <Star className="w-6 h-6 text-yellow-500 fill-current" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Produtos Mais Pedidos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra os favoritos das nossas clientes! Estes são os produtos mais amados e pedidos.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularProducts.map(product => (
          <div key={product.id} className="relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                Mais Pedido
              </span>
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
