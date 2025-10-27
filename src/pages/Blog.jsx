import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import { articles } from '../data/articles';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', ...new Set(articles.map(article => article.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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
            Blog & Artigos
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-poppins">
            Explore insights, tendências e conhecimentos sobre educação, tecnologia e inovação. 
            Artigos escritos por especialistas para inspirar e informar.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar artigos..."
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

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass p-8 rounded-xl hover:glass-hover">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-gold/20 text-primary-gold rounded-full text-sm font-medium">
                  Destaque
                </span>
                <span className="px-3 py-1 bg-primary-purple/20 text-primary-purple rounded-full text-sm font-medium">
                  {featuredArticle.category}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                {featuredArticle.title}
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredArticle.publishDate).toLocaleDateString('pt-MZ')}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredArticle.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredArticle.author.name}
                </div>
              </div>
              <Link
                to={`/blog/${featuredArticle.id}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                Ler Artigo Completo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {regularArticles.map((article) => (
            <motion.article
              key={article.id}
              className="glass p-6 rounded-xl hover:glass-hover hover:neon-glow-hover"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue rounded-full text-xs font-medium">
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.publishDate).toLocaleDateString('pt-MZ')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${article.id}`}
                className="btn-primary w-full text-center inline-flex items-center justify-center gap-2"
              >
                Ler Mais
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 text-lg">
              Nenhum artigo encontrado com os critérios selecionados.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Blog;
