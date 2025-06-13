
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Cart from './Cart';
import FeaturedBanner from './FeaturedBanner';
import PopularProducts from './PopularProducts';
import ProductVideos from './ProductVideos';
import InstagramSection from './InstagramSection';
import LocationSection from './LocationSection';
import Footer from './Footer';
import ParallaxSection from './ParallaxSection';
import ParallaxDivider from './ParallaxDivider';
import StarField from './StarField';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/Product';
import { Sparkles, Filter, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const products: Product[] = [
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
      id: '2',
      name: 'Bolsa de Crochê Premium',
      description: 'Bolsa artesanal em crochê com forro interno. Ideal para o dia a dia com muito estilo e personalidade.',
      price: 125.00,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
      category: 'acessorios'
    },
    {
      id: '3',
      name: 'Vela Aromática Lavanda',
      description: 'Vela artesanal com essência natural de lavanda. Proporciona relaxamento e bem-estar para sua casa.',
      price: 45.50,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
      category: 'decoracao'
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
      id: '5',
      name: 'Brincos Pérola Elegante',
      description: 'Brincos delicados com pérolas naturais. Elegância e sofisticação para qualquer ocasião.',
      price: 78.00,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
      category: 'joias'
    },
    {
      id: '6',
      name: 'Sabonete Artesanal Natural',
      description: 'Sabonete produzido com ingredientes naturais, sem químicos agressivos. Cuida da sua pele com carinho.',
      price: 28.90,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop',
      category: 'cosmeticos'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'joias', name: 'Joias' },
    { id: 'acessorios', name: 'Acessórios' },
    { id: 'decoracao', name: 'Decoração' },
    { id: 'cosmeticos', name: 'Cosméticos' }
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen gradient-pink relative">
      {/* Star Field Background */}
      <StarField />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-100 z-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-pink-500" />
                Arte Feminina
              </h1>
              <p className="text-gray-600 text-lg">Produtos artesanais únicos, feitos especialmente para você</p>
            </div>
            
            <div className="relative">
              <Button
                onClick={() => setIsCartOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                Carrinho
                {getTotalItems() > 0 && (
                  <span className="bg-white text-pink-600 rounded-full w-6 h-6 text-xs font-bold flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Featured Banner */}
        <ParallaxSection speed={0.05}>
          <FeaturedBanner />
        </ParallaxSection>

        <ParallaxDivider pattern="waves" />

        {/* Popular Products */}
        <ParallaxSection speed={0.03}>
          <PopularProducts />
        </ParallaxSection>

        <ParallaxDivider pattern="geometric" />

        {/* Category Filter */}
        <ParallaxSection speed={0.04}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filtrar por categoria:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' 
                      : 'border-pink-200 text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 mb-12">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </ParallaxSection>

        <ParallaxDivider pattern="dots" />

        {/* Product Videos */}
        <ParallaxSection speed={0.02}>
          <div className="mb-8">
            <ProductVideos />
          </div>
        </ParallaxSection>

        {/* Instagram Section */}
        <ParallaxSection speed={0.03}>
          <div className="mb-8">
            <InstagramSection />
          </div>
        </ParallaxSection>

        <ParallaxDivider pattern="geometric" />

        {/* Location Section */}
        <ParallaxSection speed={0.02}>
          <div className="mb-8">
            <LocationSection />
          </div>
        </ParallaxSection>
      </div>

      {/* Footer - sem z-index conflitante */}
      <div className="relative z-10">
        <Footer />
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ProductCatalog;
