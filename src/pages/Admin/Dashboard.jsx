import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  Calendar,
  Mail,
  TrendingUp,
  DollarSign,
  LogOut,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_contacts: 0,
    total_quotes: 0,
    total_appointments: 0,
    active_subscribers: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  // Check if user is authenticated
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch data
  const fetchData = async () => {
    const token = getAuthToken();
    if (!token) return;

    setIsLoading(true);
    try {
      // Fetch stats
      const statsRes = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch contacts
      const contactsRes = await fetch(`${API_BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const contactsData = await contactsRes.json();
      setContacts(contactsData);

      // Fetch quotes
      const quotesRes = await fetch(`${API_BASE_URL}/quotes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const quotesData = await quotesRes.json();
      setQuotes(quotesData);

      // Fetch appointments
      const appointmentsRes = await fetch(`${API_BASE_URL}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const appointmentsData = await appointmentsRes.json();
      setAppointments(appointmentsData);

      // Fetch subscribers
      const subscribersRes = await fetch(`${API_BASE_URL}/newsletter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const subscribersData = await subscribersRes.json();
      setSubscribers(subscribersData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.success('Logout realizado com sucesso!');
    navigate('/admin/login');
  };

  // Update status
  const updateStatus = async (type, id, status) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${type}/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Status atualizado com sucesso!');
        fetchData();
      } else {
        toast.error('Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white/70 font-poppins">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 font-montserrat">
              Dashboard Admin
            </h1>
            <p className="text-white/70 font-poppins">
              Gerencie contatos, cotações e agendamentos
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 gold-border"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-yellow-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-montserrat">
              {stats.total_contacts || contacts.length}
            </h3>
            <p className="text-white/70 text-sm font-poppins">Contatos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 gold-border"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-yellow-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-montserrat">
              {stats.total_quotes || quotes.length}
            </h3>
            <p className="text-white/70 text-sm font-poppins">Cotações</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 gold-border"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-yellow-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-montserrat">
              {stats.total_appointments || appointments.length}
            </h3>
            <p className="text-white/70 text-sm font-poppins">Agendamentos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 gold-border"
          >
            <div className="flex items-center justify-between mb-4">
              <Mail className="w-8 h-8 text-yellow-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 font-montserrat">
              {stats.active_subscribers || subscribers.length}
            </h3>
            <p className="text-white/70 text-sm font-poppins">Newsletter</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-white/10">
          {[
            { id: 'overview', label: 'Visão Geral', icon: Eye },
            { id: 'contacts', label: 'Contatos', icon: Users },
            { id: 'quotes', label: 'Cotações', icon: FileText },
            { id: 'appointments', label: 'Agendamentos', icon: Calendar },
            { id: 'subscribers', label: 'Newsletter', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold flex items-center gap-2 transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-yellow-400 border-yellow-400'
                    : 'text-white/70 border-transparent hover:text-yellow-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="glass rounded-2xl p-6 gold-border">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
                Visão Geral
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 font-montserrat">
                    Contatos Recentes
                  </h3>
                  <div className="space-y-2">
                    {contacts.slice(0, 5).map((contact) => (
                      <div
                        key={contact.id}
                        className="p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <p className="text-white font-medium font-poppins">
                          {contact.nome} {contact.apelido}
                        </p>
                        <p className="text-white/70 text-sm font-poppins">
                          {contact.email} • {contact.assunto}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 font-montserrat">
                    Cotações Recentes
                  </h3>
                  <div className="space-y-2">
                    {quotes.slice(0, 5).map((quote) => (
                      <div
                        key={quote.id}
                        className="p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <p className="text-white font-medium font-poppins">
                          {quote.name}
                        </p>
                        <p className="text-white/70 text-sm font-poppins">
                          {quote.work_type} • {quote.pages} páginas
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
                Contatos ({contacts.length})
              </h2>
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1 font-montserrat">
                          {contact.nome} {contact.apelido}
                        </h3>
                        <p className="text-white/70 text-sm font-poppins mb-2">
                          {contact.email} • {contact.telefone}
                        </p>
                        <p className="text-white/80 font-poppins mb-2">
                          <strong>Assunto:</strong> {contact.assunto}
                        </p>
                        <p className="text-white/70 text-sm font-poppins">
                          {contact.mensagem}
                        </p>
                        <p className="text-white/50 text-xs mt-2 font-poppins">
                          {new Date(contact.created_at).toLocaleString('pt-MZ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
                Cotações ({quotes.length})
              </h2>
              <div className="space-y-3">
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1 font-montserrat">
                          {quote.name}
                        </h3>
                        <p className="text-white/70 text-sm font-poppins mb-2">
                          {quote.email} • {quote.phone}
                        </p>
                        <p className="text-white/80 font-poppins mb-2">
                          <strong>Tipo:</strong> {quote.work_type} •{' '}
                          <strong>Páginas:</strong> {quote.pages} •{' '}
                          <strong>Prazo:</strong> {quote.deadline}
                        </p>
                        {quote.calculated_price && (
                          <p className="text-yellow-400 font-semibold font-poppins mb-2">
                            Preço: {parseFloat(quote.calculated_price).toLocaleString('pt-MZ')} MT
                          </p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => updateStatus('quotes', quote.id, 'contacted')}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                          >
                            Marcar como Contactado
                          </button>
                          <button
                            onClick={() => updateStatus('quotes', quote.id, 'converted')}
                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                          >
                            Marcar como Convertido
                          </button>
                        </div>
                        <p className="text-white/50 text-xs mt-2 font-poppins">
                          {new Date(quote.created_at).toLocaleString('pt-MZ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
                Agendamentos ({appointments.length})
              </h2>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1 font-montserrat">
                          {appointment.name}
                        </h3>
                        <p className="text-white/70 text-sm font-poppins mb-2">
                          {appointment.email} • {appointment.phone}
                        </p>
                        <p className="text-white/80 font-poppins mb-2">
                          <strong>Serviço:</strong> {appointment.service}
                        </p>
                        <p className="text-white/80 font-poppins mb-2">
                          <strong>Data:</strong> {new Date(appointment.date).toLocaleDateString('pt-MZ')} •{' '}
                          <strong>Hora:</strong> {appointment.time}
                        </p>
                        {appointment.message && (
                          <p className="text-white/70 text-sm font-poppins mb-2">
                            {appointment.message}
                          </p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => updateStatus('appointments', appointment.id, 'confirmed')}
                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => updateStatus('appointments', appointment.id, 'cancelled')}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                        <p className="text-white/50 text-xs mt-2 font-poppins">
                          {new Date(appointment.created_at).toLocaleString('pt-MZ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 font-montserrat">
                Inscritos na Newsletter ({subscribers.length})
              </h2>
              <div className="space-y-3">
                {subscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-medium font-poppins">
                        {subscriber.email}
                      </p>
                      <p className="text-white/50 text-xs mt-1 font-poppins">
                        Inscrito em: {new Date(subscriber.subscribed_at).toLocaleString('pt-MZ')}
                      </p>
                    </div>
                    {subscriber.is_active ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                        Ativo
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                        Inativo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

