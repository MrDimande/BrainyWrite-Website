import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../config/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(api.newsletter, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        toast.success('Inscrição realizada com sucesso! Verifique seu email.');
      } else {
        throw new Error(data.message || 'Erro ao inscrever-se na newsletter');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(error.message || 'Erro ao inscrever-se na newsletter. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="h-full flex flex-col">
        <h3 className="text-white font-semibold text-lg mb-6 font-montserrat">
          Newsletter
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
          <CheckCircle className="w-10 h-10 text-green-400 mb-3" />
          <p className="text-white font-semibold mb-2 font-montserrat">
            Inscrição Confirmada!
          </p>
          <p className="text-white/70 text-sm font-poppins">
            Você receberá nossas novidades e atualizações em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-white font-semibold text-lg mb-6 font-montserrat">
        Newsletter
      </h3>
      <p className="text-white/70 text-sm mb-4 font-poppins">
        Receba nossas novidades e atualizações
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email aqui..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 font-poppins text-sm"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary px-4 py-2.5 rounded-lg font-semibold text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Inscrevendo...</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span>Inscrever-se</span>
            </>
          )}
        </button>
        <p className="text-white/60 text-xs mt-auto font-poppins">
          Ao inscrever-se, você concorda com nossa Política de Privacidade.
        </p>
      </form>
    </div>
  );
};

export default Newsletter;

