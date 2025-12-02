import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  MessageCircle,
  Heart,
  Bookmark,
  Sparkles,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { articles, getRelatedArticles } from '../data/articles';
import { toast } from 'react-hot-toast';

const Article = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [copied, setCopied] = useState(false);
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

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

  if (!article) {
    return (
      <div className="bg-black text-white min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-2xl p-12 max-w-md mx-auto gold-border">
            <h1 className="text-4xl font-bold mb-4 gradient-text font-montserrat">Artigo não encontrado</h1>
            <p className="text-white/70 mb-6 font-poppins">O artigo que você procura não existe ou foi removido.</p>
            <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Blog
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-16">
      {/* Hero Header */}
      <section className="relative py-12 bg-gradient-to-br from-black via-gray-900 to-black border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors duration-300 mb-6 font-poppins"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Blog</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">

        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold text-white font-poppins">
              {article.category}
            </span>
            {article.featured && (
              <motion.span
                className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-sm font-semibold text-yellow-300 font-poppins flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Sparkles className="w-4 h-4" />
                Destaque
              </motion.span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight font-montserrat">
            {article.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed font-poppins">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-white/70 font-poppins">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              {new Date(article.publishDate).toLocaleDateString('pt-MZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              {article.readTime} de leitura
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-yellow-400" />
              {article.author.name}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-semibold font-poppins ${
                isLiked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Curtido' : 'Curtir'}
            </motion.button>
            <motion.button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-semibold font-poppins ${
                isBookmarked
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Salvo' : 'Salvar'}
            </motion.button>

            {/* Share Dropdown */}
            <div className="relative group">
              <motion.button
                className="flex items-center gap-2 px-5 py-3 bg-white/5 text-white/70 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold font-poppins"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />
                Compartilhar
              </motion.button>

              <div className="absolute left-0 top-full mt-2 glass rounded-xl p-2 gold-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-poppins"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-poppins"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-poppins"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-poppins"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar Link'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Author Info */}
        <motion.div
          className="glass rounded-2xl p-6 mb-12 gold-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center gold-shadow flex-shrink-0">
              <User className="w-10 h-10 text-black" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1 font-montserrat">
                {article.author.name}
              </h3>
              <p className="text-yellow-400 font-semibold mb-2 font-poppins">
                {article.author.role}
              </p>
              <p className="text-white/70 text-sm leading-relaxed font-poppins">
                {article.author.bio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          className="prose prose-lg prose-invert max-w-none mb-12 text-justify font-poppins"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{
            '--tw-prose-body': 'rgb(229, 231, 235)',
            '--tw-prose-headings': 'rgb(255, 255, 255)',
            '--tw-prose-links': 'rgb(234, 179, 8)',
            '--tw-prose-bold': 'rgb(255, 255, 255)',
            '--tw-prose-code': 'rgb(234, 179, 8)',
          }}
        />

        {/* Tags */}
        <motion.div
          className="mb-12 glass rounded-2xl p-6 gold-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white font-montserrat">Tags:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?search=${tag}`}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/30 transition-all duration-300 font-poppins"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="glass rounded-2xl p-8 gold-border">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 font-montserrat">
              <MessageCircle className="w-6 h-6 text-yellow-400" />
              Comentários ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Deixe seu comentário... Seja respeitoso e construtivo!"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 resize-none font-poppins"
                rows="4"
              />
              <motion.button
                type="submit"
                className="mt-4 btn-primary px-6 py-3 rounded-xl font-semibold font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!comment.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Comentar
              </motion.button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              <AnimatePresence>
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className="glass rounded-xl p-6 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-white mb-1 font-montserrat">{comment.author}</h4>
                        <p className="text-sm text-white/50 font-poppins">
                          {new Date(comment.date).toLocaleDateString('pt-MZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <button className="flex items-center gap-1.5 text-white/50 hover:text-red-400 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/5 font-poppins">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-white/80 leading-relaxed font-poppins">{comment.content}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-white font-montserrat">
              Artigos <span className="gradient-text">Relacionados</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} to={`/blog/${relatedArticle.id}`}>
                  <motion.div
                    className="group glass rounded-2xl p-6 gold-border hover:glass-hover transition-all duration-300 h-full flex flex-col"
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs font-semibold text-white font-poppins">
                        {relatedArticle.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold mb-3 text-white line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300 font-montserrat leading-tight">
                      {relatedArticle.title}
                    </h4>
                    <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-1 font-poppins leading-relaxed">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-poppins mb-4">
                      <Clock className="w-3 h-3" />
                      <span>{relatedArticle.readTime}</span>
                    </div>
                    <span className="text-yellow-400 text-sm font-semibold font-poppins inline-flex items-center gap-2">
                      Ler Artigo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Article;
