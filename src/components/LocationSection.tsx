
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Phone } from 'lucide-react';

const LocationSection: React.FC = () => {
  const openGoogleMaps = () => {
    const address = "Rua das Flores, 123, Centro, Curitiba, PR";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Visite Nossa Loja
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Venha conhecer nossa loja física e ver de perto a qualidade dos nossos produtos artesanais!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-xl">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Map placeholder */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-green-100 to-blue-100">
                <div 
                  className="w-full h-full bg-cover bg-center cursor-pointer relative group"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop')`
                  }}
                  onClick={openGoogleMaps}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-sm font-medium text-gray-800">
                        Clique para abrir no Google Maps
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store info */}
              <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Arte Feminina Store
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Endereço</p>
                      <p className="text-gray-600">Rua das Flores, 123<br />Centro, Curitiba - PR<br />CEP: 80010-000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Horário de Funcionamento</p>
                      <p className="text-gray-600">Segunda à Sexta: 9h às 18h<br />Sábado: 9h às 16h<br />Domingo: Fechado</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Telefone</p>
                      <p className="text-gray-600">(41) 99162-6645</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={openGoogleMaps}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5" />
                    Ver no Google Maps
                  </Button>
                  
                  <Button
                    onClick={() => {
                      const message = "Olá! Gostaria de visitar a loja física. Qual o melhor horário?";
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://api.whatsapp.com/send?phone=5541991626645&text=${encodedMessage}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Falar no WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LocationSection;
