
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/Product';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    const message = `Olá! Tenho interesse no produto: ${product.name} - R$ ${product.price.toFixed(2)}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5541999999999&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 gradient-card border-pink-100">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4 text-pink-500" />
          </Button>
        </div>
        {product.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Destaque
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-pink-600">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ShoppingCart className="w-4 h-4" />
            Carrinho
          </Button>
          
          <Button
            onClick={handleWhatsAppClick}
            variant="outline"
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50 font-medium py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
