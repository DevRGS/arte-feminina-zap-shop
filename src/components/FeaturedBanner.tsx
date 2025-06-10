
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart } from 'lucide-react';

const FeaturedBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 mb-12">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative px-8 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-300" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Coleção Especial
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-pink-100">
            Produtos artesanais únicos, criados com carinho especialmente para você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Heart className="w-5 h-5 mr-2" />
              Ver Coleção
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-pink-600 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 backdrop-blur-sm"
              onClick={() => {
                const message = "Olá! Gostaria de conhecer a coleção especial de produtos artesanais.";
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://api.whatsapp.com/send?phone=5541991626645&text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Falar Conosco
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
