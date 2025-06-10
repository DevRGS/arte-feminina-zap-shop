
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/useCart';
import { Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { Address, Customer } from '@/types/Cart';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    email: ''
  });
  
  const [address, setAddress] = useState<Address>({
    cep: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: ''
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) return;
    
    setIsLoadingCep(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique se o CEP está correto.",
          variant: "destructive"
        });
        return;
      }
      
      setAddress(prev => ({
        ...prev,
        city: data.localidade || '',
        neighborhood: data.bairro || '',
        street: data.logradouro || ''
      }));
      
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleCepChange = (value: string) => {
    const formatted = value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
    setAddress(prev => ({ ...prev, cep: formatted }));
    
    if (formatted.replace(/\D/g, '').length === 8) {
      fetchAddressByCep(formatted);
    }
  };

  const validateForm = () => {
    if (!customer.name || !customer.phone) {
      toast({
        title: "Dados incompletos",
        description: "Preencha seu nome e telefone.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!address.cep || !address.number) {
      toast({
        title: "Endereço incompleto",
        description: "Preencha o CEP e número.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;
    
    const orderDetails = `
*NOVO PEDIDO - Arte Feminina*

*Cliente:*
Nome: ${customer.name}
Telefone: ${customer.phone}
${customer.email ? `Email: ${customer.email}` : ''}

*Produtos:*
${items.map(item => 
  `• ${item.product.name}\n  Qtd: ${item.quantity}x | Valor unitário: R$ ${item.product.price.toFixed(2)} | Subtotal: R$ ${(item.product.price * item.quantity).toFixed(2)}`
).join('\n\n')}

*Endereço:*
CEP: ${address.cep}
${address.street}, ${address.number}
${address.complement ? `Complemento: ${address.complement}` : ''}
${address.neighborhood} - ${address.city}

*TOTAL DO PEDIDO: R$ ${getTotalPrice().toFixed(2)}*
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5541991626645&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Pedido enviado!",
      description: "Você será direcionado para o WhatsApp.",
    });
    
    clearCart();
    onClose();
  };

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full max-w-lg">
          <SheetHeader>
            <SheetTitle>Seu Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 text-center">Seu carrinho está vazio</p>
            <Button onClick={onClose} className="mt-4">
              Continuar Comprando
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Seu Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'})</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Lista de Produtos */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.product.name}</h3>
                  <p className="text-pink-600 font-semibold">R$ {item.product.price.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    Subtotal: R$ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Dados do Cliente</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={customer.phone}
                  onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Endereço de Entrega</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  value={address.cep}
                  onChange={(e) => handleCepChange(e.target.value)}
                  placeholder="00000-000"
                  disabled={isLoadingCep}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={address.city}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    value={address.neighborhood}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  value={address.street}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="number">Número *</Label>
                  <Input
                    id="number"
                    value={address.number}
                    onChange={(e) => setAddress(prev => ({ ...prev, number: e.target.value }))}
                    placeholder="123"
                  />
                </div>
                
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={address.complement}
                    onChange={(e) => setAddress(prev => ({ ...prev, complement: e.target.value }))}
                    placeholder="Apto 101"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="border-t pt-4">
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Resumo do Pedido</h3>
              
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>{item.quantity}x {item.product.name}</span>
                  <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-pink-600">R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão de Finalizar Pedido */}
          <Button
            onClick={handleWhatsAppOrder}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 rounded-full flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Finalizar Pedido no WhatsApp
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
