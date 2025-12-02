import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, User, CheckCircle, Star, Filter, Search } from 'lucide-react';
import { portfolioItems, getPortfolioByCategory } from '../data/portfolio';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['Todas', ...new Set(portfolioItems.map(item => item.category))];

  const filteredItems = getPortfolioByCategory(selectedCategory).filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-black text-white min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden border-b border-white/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,215,0,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,215,0,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 font-montserrat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="gradient-text">Nosso Portfólio</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins">
              Explore nossos projetos mais recentes e veja como transformamos ideias em soluções digitais inovadoras.
              Cada projeto representa nosso compromisso com a excelência e inovação.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: '50+', label: 'Projetos Concluídos' },
            { value: '40+', label: 'Clientes Satisfeitos' },
            { value: '2+', label: 'Anos de Experiência' },
            { value: '100%', label: 'Taxa de Sucesso' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center gold-border hover:glass-hover transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2 font-montserrat">{stat.value}</h3>
              <p className="text-white/70 text-sm font-poppins">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="glass rounded-2xl p-6 gold-border">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar projetos por nome, descrição ou tecnologias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 font-poppins"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="text-yellow-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 font-poppins"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category === 'Todas' ? '📚 Todas as Categorias' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative glass rounded-2xl overflow-hidden gold-border hover:glass-hover transition-all duration-300 flex flex-col"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Project Image */}
              <div className="relative h-56 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-yellow-600/30 to-black/30 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 gold-shadow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ExternalLink className="w-10 h-10 text-black" />
                    </motion.div>
                    <p className="text-white font-semibold text-lg font-montserrat">Projeto {item.title.split(' ')[0]}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-md font-poppins ${
                    item.status === 'Concluído'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-1 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold text-white font-poppins">
                    {item.category}
                  </span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70 font-poppins">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300 font-montserrat leading-tight">
                  {item.title}
                </h3>

                <p className="text-white/70 mb-4 line-clamp-3 flex-1 font-poppins leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-white/60 font-poppins">
                  <User className="w-4 h-4 text-yellow-400" />
                  <span>{item.client}</span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70 font-poppins"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/50 font-poppins">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Results Preview */}
                <div className="mb-6 glass rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-green-400 font-poppins">Resultado:</span>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2 font-poppins leading-relaxed">
                    {item.results[0]}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <motion.button
                    onClick={() => setSelectedProject(item)}
                    className="flex-1 btn-primary text-center py-3 rounded-xl font-semibold font-poppins"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver Detalhes
                  </motion.button>
                  <motion.button
                    className="px-4 py-3 bg-white/5 border border-white/10 text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass rounded-2xl p-12 max-w-md mx-auto gold-border">
              <Search className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">
                Nenhum projeto encontrado
              </h3>
              <p className="text-white/70 mb-6 font-poppins">
                Não encontramos projetos que correspondam aos seus critérios de busca.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                }}
                className="btn-secondary px-6 py-3 rounded-full font-semibold font-poppins"
              >
                Limpar Filtros
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="glass p-8 md:p-12 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto gold-border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4 font-montserrat leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-white/70 font-poppins">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-yellow-400" />
                    <span>{selectedProject.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    <span>{selectedProject.year}</span>
                  </div>
                  <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold text-white">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-xl font-bold"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <p className="text-lg text-white/80 mb-8 leading-relaxed font-poppins">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div className="glass rounded-xl p-6 gold-border">
                <h3 className="text-xl font-bold mb-4 text-white font-montserrat flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Funcionalidades
                </h3>
                <ul className="space-y-3">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/80 font-poppins">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="glass rounded-xl p-6 gold-border">
                <h3 className="text-xl font-bold mb-4 text-white font-montserrat flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  Resultados
                </h3>
                <ul className="space-y-3">
                  {selectedProject.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3 text-white/80 font-poppins">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-8 glass rounded-xl p-6 gold-border">
              <h3 className="text-xl font-bold mb-4 text-white font-montserrat">Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/30 transition-all duration-300 font-poppins"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {selectedProject.testimonial && (
              <div className="mt-8 glass p-6 rounded-xl gold-border">
                <h3 className="text-xl font-bold mb-4 text-white font-montserrat flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  Depoimento do Cliente
                </h3>
                <blockquote className="text-white/80 italic mb-4 leading-relaxed font-poppins text-lg">
                  "{selectedProject.testimonial.text}"
                </blockquote>
                <cite className="text-yellow-400 font-semibold font-poppins">
                  — {selectedProject.testimonial.author}
                </cite>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold font-poppins"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-5 h-5" />
                Ver Projeto
              </motion.button>
              <motion.button
                className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold font-poppins"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5" />
                Código Fonte
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
