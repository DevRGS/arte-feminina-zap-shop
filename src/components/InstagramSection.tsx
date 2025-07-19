
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const InstagramSection: React.FC = () => {
  const instagramImages = [
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop'
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">@</span>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Siga no Instagram
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Acompanhe nosso dia a dia e veja mais produtos incríveis no nosso Instagram!
        </p>
        <Button
          onClick={() => window.open('https://www.instagram.com/lossantosrafael/', '_blank')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          @artefeminina_store
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {instagramImages.map((image, index) => (
          <Card 
            key={index} 
            className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => window.open('https://instagram.com/artefeminina_store', '_blank')}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img
                  src={image}
                  alt={`Post do Instagram ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-pink-500 font-bold text-sm">@</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
