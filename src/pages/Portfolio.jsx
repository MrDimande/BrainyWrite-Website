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
    <div className="bg-bg-dark text-white min-h-screen pt-24">
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text font-montserrat">
            Nosso Portfólio
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-poppins">
            Explore nossos projetos mais recentes e veja como transformamos ideias em soluções digitais inovadoras. 
            Cada projeto representa nosso compromisso com a excelência e inovação.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: '20+', label: 'Projetos Concluídos' },
            { value: '15+', label: 'Clientes Satisfeitos' },
            { value: '5+', label: 'Anos de Experiência' },
            { value: '100%', label: 'Taxa de Sucesso' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass p-6 rounded-xl text-center hover:glass-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
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
              className="glass rounded-xl overflow-hidden hover:glass-hover hover:neon-glow-hover group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-purple/20 to-primary-blue/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/30 to-primary-blue/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-medium">Projeto {item.title.split(' ')[0]}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Concluído' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-gold transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{item.client}</span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Results Preview */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Resultados:</span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {item.results[0]}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="flex-1 btn-primary text-center"
                  >
                    Ver Detalhes
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-300">
                    <Github className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 text-lg">
              Nenhum projeto encontrado com os critérios selecionados.
            </p>
          </motion.div>
        )}
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="glass p-8 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedProject.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedProject.year}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            <p className="text-lg text-gray-300 mb-6">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Funcionalidades</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Resultados</h3>
                <ul className="space-y-2">
                  {selectedProject.results.map((result, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <Star className="w-4 h-4 text-primary-gold flex-shrink-0" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-purple/20 text-primary-purple rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {selectedProject.testimonial && (
              <div className="mt-8 glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Depoimento do Cliente</h3>
                <blockquote className="text-gray-300 italic mb-4">
                  "{selectedProject.testimonial.text}"
                </blockquote>
                <cite className="text-primary-gold font-medium">
                  — {selectedProject.testimonial.author}
                </cite>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button className="btn-primary flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Ver Projeto
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Github className="w-5 h-5" />
                Código Fonte
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
