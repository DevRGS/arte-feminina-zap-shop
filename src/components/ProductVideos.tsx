
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Video } from 'lucide-react';

const ProductVideos: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSlides = [
    {
      id: 1,
      title: 'Colar Dourado em Uso',
      description: 'Veja como fica elegante no dia a dia',
      thumbnail: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 2,
      title: 'Almofada Decorativa',
      description: 'Transformando ambientes com charme',
      thumbnail: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 3,
      title: 'Bolsa de Crochê',
      description: 'Estilo e praticidade para o dia a dia',
      thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    }
  ];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    setShowControls(true);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setShowControls(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowControls(true);
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
              <div className="relative h-96 overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  poster={currentVideo.thumbnail}
                  className="w-full h-full object-cover cursor-pointer"
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onClick={handleVideoClick}
                  controls={false}
                />

                {/* Play/Pause Button */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <Button
                    onClick={togglePlayPause}
                    className="bg-white/90 hover:bg-white text-pink-600 rounded-full w-16 h-16 p-0 shadow-xl transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 fill-current" />
                    ) : (
                      <Play className="w-8 h-8 fill-current" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {currentVideo.title}
                  </h3>
                  <p className="text-gray-600">
                    {currentVideo.description}
                  </p>
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
                setIsPlaying(false);
                setShowControls(true);
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
