import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, MessageCircle, Heart, Bookmark } from 'lucide-react';
import { articles, getRelatedArticles } from '../data/articles';

const Article = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Maria Silva',
      content: 'Excelente artigo! Muito informativo e bem estruturado.',
      date: '2024-01-16',
      likes: 5
    },
    {
      id: 2,
      author: 'João Santos',
      content: 'Gostei especialmente da parte sobre implementação em Moçambique.',
      date: '2024-01-15',
      likes: 3
    }
  ]);

  const article = articles.find(a => a.id === parseInt(id));
  const relatedArticles = getRelatedArticles(parseInt(id));

  if (!article) {
    return (
      <div className="bg-bg-dark text-white min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="btn-primary">
            Voltar ao Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'Usuário Anônimo',
        content: comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-bg-dark text-white min-h-screen pt-24">
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-teal hover:text-primary-gold transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-primary-purple/20 text-primary-purple rounded-full text-sm font-medium">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 bg-primary-gold/20 text-primary-gold rounded-full text-sm font-medium">
                Destaque
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(article.publishDate).toLocaleDateString('pt-MZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {article.author.name}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                isLiked 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Curtido' : 'Curtir'}
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                isBookmarked 
                  ? 'bg-primary-gold/20 text-primary-gold' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Salvo' : 'Salvar'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-300">
              <Share2 className="w-5 h-5" />
              Compartilhar
            </button>
          </div>
        </motion.header>

        {/* Author Info */}
        <motion.div
          className="glass p-6 rounded-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-purple to-primary-blue rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {article.author}
              </h3>
              <p className="text-primary-gold font-medium mb-2">
                Fundador da BrainyWrite
              </p>
              <p className="text-gray-300 text-sm">
                Licenciado em Planeamento e Ordenamento Territorial
              </p>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          className="prose prose-lg prose-invert max-w-none mb-12 text-justify"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-purple/20 text-primary-purple rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Comentários ({comments.length})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deixe seu comentário..."
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple focus:ring-1 focus:ring-primary-purple resize-none"
              rows="4"
            />
            <button
              type="submit"
              className="mt-4 btn-primary"
              disabled={!comment.trim()}
            >
              Comentar
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="glass p-6 rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{comment.author}</h4>
                    <p className="text-sm text-gray-400">{comment.date}</p>
                  </div>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors duration-300">
                    <Heart className="w-4 h-4" />
                    {comment.likes}
                  </button>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-white">
            Artigos Relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <motion.div
                key={relatedArticle.id}
                className="glass p-6 rounded-xl hover:glass-hover"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue rounded-full text-xs font-medium">
                    {relatedArticle.category}
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-3 text-white line-clamp-2">
                  {relatedArticle.title}
                </h4>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {relatedArticle.excerpt}
                </p>
                <Link
                  to={`/blog/${relatedArticle.id}`}
                  className="btn-primary w-full text-center"
                >
                  Ler Artigo
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Article;
