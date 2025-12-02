import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Tag,
} from "lucide-react";
import { articles } from "../data/articles";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("recent");

  const categories = [
    "Todas",
    ...new Set(articles.map((article) => article.category)),
  ];
  const allTags = [...new Set(articles.flatMap((article) => article.tags))];

  let filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "Todas" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort articles
  if (sortBy === "recent") {
    filteredArticles.sort(
      (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
    );
  } else if (sortBy === "oldest") {
    filteredArticles.sort(
      (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
    );
  } else if (sortBy === "readTime") {
    filteredArticles.sort(
      (a, b) => parseInt(a.readTime) - parseInt(b.readTime)
    );
  }

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const regularArticles = filteredArticles.filter(
    (article) => !article.featured
  );

  // Statistics
  const totalArticles = articles.length;
  const totalCategories = categories.length - 1;
  const avgReadTime = Math.round(
    articles.reduce((acc, article) => acc + parseInt(article.readTime), 0) /
      articles.length
  );

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
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,215,0,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,215,0,0.2) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/30 rounded-full px-6 py-3 text-yellow-300 text-sm font-medium font-poppins mb-6 gold-shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Conhecimento e Inovação</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-montserrat">
              <span className="gradient-text">Blog & Artigos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-poppins mb-8">
              Explore insights, tendências e conhecimentos sobre educação,
              tecnologia e inovação. Artigos escritos por especialistas para
              inspirar e informar.
            </p>

            {/* Statistics */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="glass rounded-xl p-6 gold-border">
                <div className="text-3xl font-bold gradient-text mb-2 font-montserrat">
                  {totalArticles}
                </div>
                <div className="text-white/70 text-sm font-poppins">
                  Artigos Publicados
                </div>
              </div>
              <div className="glass rounded-xl p-6 gold-border">
                <div className="text-3xl font-bold gradient-text mb-2 font-montserrat">
                  {totalCategories}
                </div>
                <div className="text-white/70 text-sm font-poppins">
                  Categorias
                </div>
              </div>
              <div className="glass rounded-xl p-6 gold-border">
                <div className="text-3xl font-bold gradient-text mb-2 font-montserrat">
                  {avgReadTime} min
                </div>
                <div className="text-white/70 text-sm font-poppins">
                  Tempo Médio
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-6 gold-border">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artigos por título, conteúdo ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 font-poppins"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-3 flex-1">
                <Filter className="text-yellow-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 font-poppins"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-gray-900"
                    >
                      {category === "Todas"
                        ? "📚 Todas as Categorias"
                        : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-yellow-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 font-poppins"
                >
                  <option value="recent" className="bg-gray-900">
                    Mais Recentes
                  </option>
                  <option value="oldest" className="bg-gray-900">
                    Mais Antigos
                  </option>
                  <option value="readTime" className="bg-gray-900">
                    Tempo de Leitura
                  </option>
                </select>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/70 font-poppins">
                  Tags Populares:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 font-poppins ${
                      searchTerm === tag
                        ? "bg-yellow-500 text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Article */}
        <AnimatePresence>
          {featuredArticle && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="group relative glass rounded-2xl overflow-hidden gold-border hover:glass-hover transition-all duration-300">
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.span
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-sm font-semibold text-yellow-300 font-poppins flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Artigo em Destaque
                    </motion.span>
                    <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white font-poppins">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight font-montserrat">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xl text-white/80 mb-8 leading-relaxed font-poppins max-w-4xl">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-white/70 font-poppins">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      {new Date(featuredArticle.publishDate).toLocaleDateString(
                        "pt-MZ",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      {featuredArticle.readTime} de leitura
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-yellow-400" />
                      {featuredArticle.author.name}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70 font-poppins"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link to={`/blog/${featuredArticle.id}`}>
                    <motion.button
                      className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 neon-glow-hover"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ler Artigo Completo
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Articles Grid */}
        {regularArticles.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat">
                Todos os <span className="gradient-text">Artigos</span>
              </h2>
              <span className="text-white/60 text-sm font-poppins">
                {regularArticles.length}{" "}
                {regularArticles.length === 1
                  ? "artigo encontrado"
                  : "artigos encontrados"}
              </span>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <AnimatePresence>
                {regularArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    className="group relative glass rounded-2xl overflow-hidden gold-border hover:glass-hover transition-all duration-300 flex flex-col"
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 p-6 flex flex-col flex-1">
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold text-white font-poppins">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <Eye className="w-4 h-4" />
                          <span className="font-poppins">Visualizar</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300 font-montserrat leading-tight">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-white/70 mb-6 line-clamp-3 flex-1 font-poppins leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-white/60 font-poppins">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                          {new Date(article.publishDate).toLocaleDateString(
                            "pt-MZ",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-yellow-400" />
                          {article.author.name.split(" ")[0]}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70 font-poppins"
                          >
                            #{tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/50 font-poppins">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Read More Button */}
                      <Link to={`/blog/${article.id}`} className="mt-auto">
                        <motion.button
                          className="w-full btn-primary py-3 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 group/btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Ler Artigo</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {/* No Results */}
        <AnimatePresence>
          {filteredArticles.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-12 max-w-md mx-auto gold-border">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 font-montserrat">
                  Nenhum artigo encontrado
                </h3>
                <p className="text-white/70 mb-6 font-poppins">
                  Não encontramos artigos que correspondam aos seus critérios de
                  busca.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todas");
                  }}
                  className="btn-secondary px-6 py-3 rounded-full font-semibold font-poppins"
                >
                  Limpar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newsletter CTA */}
        {filteredArticles.length > 0 && (
          <motion.div
            className="mt-16 glass rounded-2xl p-8 md:p-12 text-center gold-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-montserrat">
              Não perca nenhum artigo!
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto font-poppins">
              Inscreva-se na nossa newsletter e receba os melhores artigos sobre
              educação, tecnologia e inovação diretamente no seu email.
            </p>
            <Link to="/contacto">
              <motion.button
                className="btn-primary px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inscrever-se na Newsletter
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Blog;
