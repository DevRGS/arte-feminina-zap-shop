
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ChevronLeft, ChevronRight, Video } from 'lucide-react';

const ProductVideos: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const videoSlides = [
    {
      id: 1,
      title: 'Colar Dourado em Uso',
      description: 'Veja como fica elegante no dia a dia',
      thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Almofada Decorativa',
      description: 'Transformando ambientes com charme',
      thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fbd0c44cd2e4?w=600&h=400&fit=crop'
      ]
    },
    {
      id: 3,
      title: 'Bolsa de Crochê',
      description: 'Estilo e praticidade para o dia a dia',
      thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
      ]
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
    setCurrentImageIndex(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % videoSlides[currentSlide].images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + videoSlides[currentSlide].images.length) % videoSlides[currentSlide].images.length);
  };

  const currentVideo = videoSlides[currentSlide];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Video className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Produtos em Ação
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Veja nossos produtos sendo utilizados no dia a dia e se inspire!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div className="relative">
              <div className="relative h-96 overflow-hidden">
                <img
                  src={currentVideo.images[currentImageIndex]}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                
                {/* Image Navigation */}
                <Button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Button
                    className="bg-white/90 hover:bg-white text-pink-600 rounded-full w-16 h-16 p-0 shadow-xl"
                    onClick={() => {
                      const message = `Olá! Gostaria de saber mais sobre: ${currentVideo.title}`;
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://api.whatsapp.com/send?phone=5541991626645&text=${encodedMessage}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    <Play className="w-8 h-8 fill-current" />
                  </Button>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {currentVideo.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {currentVideo.title}
                    </h3>
                    <p className="text-gray-600">
                      {currentVideo.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={prevSlide}
                      variant="outline"
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={nextSlide}
                      variant="outline"
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Thumbnails */}
        <div className="flex justify-center gap-4 mt-6">
          {videoSlides.map((video, index) => (
            <button
              key={video.id}
              onClick={() => {
                setCurrentSlide(index);
                setCurrentImageIndex(0);
              }}
              className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentSlide ? 'ring-2 ring-pink-500 scale-110' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductVideos;
