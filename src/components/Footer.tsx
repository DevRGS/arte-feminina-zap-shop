
import React from 'react';
import { Heart, MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-pink-200" />
              <h3 className="text-2xl font-bold">Arte Feminina</h3>
            </div>
            <p className="text-pink-100 mb-4 max-w-md">
              Produtos artesanais únicos, feitos especialmente para você. 
              Cada peça é criada com carinho e dedicação para tornar seus momentos mais especiais.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.open('https://instagram.com/artefeminina_store', '_blank')}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-pink-100">
              <li><a href="#" className="hover:text-white transition-colors">Produtos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-pink-100">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(41) 99162-6645</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contato@artefeminina.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Curitiba, PR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-pink-100">
          <p>&copy; 2024 Arte Feminina. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Feito com <Heart className="w-4 h-4 inline text-pink-300" /> para você</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
