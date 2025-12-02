import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Edit2,
    Eye,
    EyeOff,
    Image,
    Loader2,
    Plus,
    Save,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthFetch } from '../../contexts/AuthContext';

const ExamManager = () => {
  const authFetch = useAuthFetch();
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form state
  const [formData, setFormData] = useState({
    subject_id: '',
    title: '',
    description: '',
    difficulty: 'medium',
    duration_minutes: 30,
    passing_score: 60,
    questions: [],
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadExams(selectedSubject.slug);
    }
  }, [selectedSubject]);

  const loadSubjects = async () => {
    try {
      const response = await authFetch('/exams/subjects');
      const data = await response.json();
      setSubjects(data.subjects || []);
      if (data.subjects?.length > 0) {
        setSelectedSubject(data.subjects[0]);
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExams = async (subjectSlug) => {
    try {
      const response = await authFetch(`/exams/subject/${subjectSlug}`);
      const data = await response.json();
      setExams(data.exams || []);
    } catch (error) {
      console.error('Error loading exams:', error);
    }
  };

  const handleCreateNew = () => {
    setEditingExam(null);
    setFormData({
      subject_id: selectedSubject?.id || '',
      title: '',
      description: '',
      difficulty: 'medium',
      duration_minutes: 30,
      passing_score: 60,
      questions: [createEmptyQuestion()],
    });
    setShowEditor(true);
  };

  const handleEdit = async (examId) => {
    try {
      const response = await authFetch(`/exams/${examId}`);
      const data = await response.json();
      const exam = data.exam;

      setEditingExam(exam);
      setFormData({
        subject_id: exam.subject_id,
        title: exam.title,
        description: exam.description || '',
        difficulty: exam.difficulty,
        duration_minutes: exam.duration_minutes,
        passing_score: exam.passing_score,
        questions: exam.questions.map((q) => ({
          question_text: q.question_text,
          explanation: q.explanation || '',
          image_url: q.image_url || '',
          image_alt: q.image_alt || '',
          image_caption: q.image_caption || '',
          correct_answer: q.options.find((o) => o.is_correct)?.letter || 'A',
          options: q.options.map((o) => ({ letter: o.letter, text: o.text })),
        })),
      });
      setShowEditor(true);
    } catch (error) {
      console.error('Error loading exam:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar exame' });
    }
  };

  const handleDelete = async (examId) => {
    if (!confirm('Tem certeza que deseja excluir este exame?')) return;

    try {
      await authFetch(`/exams/${examId}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Exame excluído com sucesso' });
      loadExams(selectedSubject.slug);
    } catch (error) {
      console.error('Error deleting exam:', error);
      setMessage({ type: 'error', text: 'Erro ao excluir exame' });
    }
  };

  const handleTogglePublish = async (examId, currentStatus) => {
    try {
      await authFetch(`/exams/${examId}/publish`, {
        method: 'PATCH',
        body: JSON.stringify({ is_published: !currentStatus }),
      });
      loadExams(selectedSubject.slug);
    } catch (error) {
      console.error('Error toggling publish:', error);
      setMessage({ type: 'error', text: 'Erro ao alterar status' });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        questions: formData.questions.map((q) => ({
          ...q,
          options: q.options.map((o) => ({
            letter: o.letter,
            text: o.text,
          })),
        })),
      };

      if (editingExam) {
        // Update existing
        await authFetch(`/exams/${editingExam.id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        setMessage({ type: 'success', text: 'Exame atualizado com sucesso' });
      } else {
        // Create new
        await authFetch('/exams', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setMessage({ type: 'success', text: 'Exame criado com sucesso' });
      }

      setShowEditor(false);
      loadExams(selectedSubject.slug);
    } catch (error) {
      console.error('Error saving exam:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar exame' });
    }
  };

  const createEmptyQuestion = () => ({
    question_text: '',
    explanation: '',
    image_url: '',
    image_alt: '',
    image_caption: '',
    correct_answer: 'A',
    options: [
      { letter: 'A', text: '' },
      { letter: 'B', text: '' },
      { letter: 'C', text: '' },
      { letter: 'D', text: '' },
    ],
  });

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, createEmptyQuestion()],
    });
  };

  const removeQuestion = (index) => {
    if (formData.questions.length <= 1) return;
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...formData.questions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, questions: updated });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...formData.questions];
    updated[qIndex].options[oIndex].text = value;
    setFormData({ ...formData, questions: updated });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-black to-transparent pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-white/60 hover:text-yellow-500 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Admin
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-montserrat">
                Gerenciar Exames
              </h1>
              <p className="text-white/60 mt-2">
                Crie, edite e publique exames para o Testing Hub
              </p>
            </div>

            <button
              onClick={handleCreateNew}
              className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Novo Exame
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 mb-6"
          >
            <div
              className={`p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
              <button
                onClick={() => setMessage({ type: '', text: '' })}
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subject Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedSubject?.id === subject.id
                  ? 'bg-yellow-500 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Exams List */}
      <div className="max-w-7xl mx-auto px-4">
        {exams.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl">
            <p className="text-white/60">Nenhum exame encontrado</p>
            <button
              onClick={handleCreateNew}
              className="mt-4 text-yellow-500 hover:text-yellow-400"
            >
              Criar primeiro exame
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{exam.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        exam.is_published
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {exam.is_published ? 'Publicado' : 'Rascunho'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        exam.difficulty === 'easy'
                          ? 'bg-green-500/20 text-green-400'
                          : exam.difficulty === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {exam.difficulty === 'easy'
                        ? 'Fácil'
                        : exam.difficulty === 'medium'
                        ? 'Médio'
                        : 'Difícil'}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{exam.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-white/40">
                    <span>{exam.total_questions} questões</span>
                    <span>{exam.duration_minutes} min</span>
                    <span>Aprovação: {exam.passing_score}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublish(exam.id, exam.is_published)}
                    className={`p-2 rounded-lg transition-colors ${
                      exam.is_published
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                    title={exam.is_published ? 'Despublicar' : 'Publicar'}
                  >
                    {exam.is_published ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(exam.id)}
                    className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
          >
            <div className="min-h-screen py-8 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-8">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">
                      {editingExam ? 'Editar Exame' : 'Novo Exame'}
                    </h2>
                    <button
                      onClick={() => setShowEditor(false)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="col-span-2">
                      <label className="block text-sm text-white/60 mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                        placeholder="Ex: Álgebra e Equações - 10ª Classe"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm text-white/60 mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500 resize-none"
                        rows={2}
                        placeholder="Breve descrição do exame"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Dificuldade
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) =>
                          setFormData({ ...formData, difficulty: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                      >
                        <option value="easy">Fácil</option>
                        <option value="medium">Médio</option>
                        <option value="hard">Difícil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Duração (minutos)
                      </label>
                      <input
                        type="number"
                        value={formData.duration_minutes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration_minutes: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                        min={5}
                        max={180}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Nota de Aprovação (%)
                      </label>
                      <input
                        type="number"
                        value={formData.passing_score}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            passing_score: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                        min={0}
                        max={100}
                      />
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">
                        Questões ({formData.questions.length})
                      </h3>
                      <button
                        onClick={addQuestion}
                        className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar Questão
                      </button>
                    </div>

                    <div className="space-y-6">
                      {formData.questions.map((question, qIndex) => (
                        <QuestionEditor
                          key={qIndex}
                          question={question}
                          index={qIndex}
                          onUpdate={(field, value) =>
                            updateQuestion(qIndex, field, value)
                          }
                          onUpdateOption={(oIndex, value) =>
                            updateOption(qIndex, oIndex, value)
                          }
                          onRemove={() => removeQuestion(qIndex)}
                          canRemove={formData.questions.length > 1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowEditor(false)}
                      className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Salvar Exame
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Question Editor Component
const QuestionEditor = ({
  question,
  index,
  onUpdate,
  onUpdateOption,
  onRemove,
  canRemove,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-white/80 hover:text-white"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          <span className="font-medium">Questão {index + 1}</span>
        </button>

        {canRemove && (
          <button
            onClick={onRemove}
            className="text-red-400 hover:text-red-300 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-sm text-white/60 mb-2">
              Texto da Questão
            </label>
            <textarea
              value={question.question_text}
              onChange={(e) => onUpdate('question_text', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500 resize-none"
              rows={2}
              placeholder="Digite a pergunta..."
            />
          </div>

          {/* Image URL */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-white/60 mb-2">
                <Image className="w-4 h-4 inline mr-1" />
                URL da Imagem (opcional)
              </label>
              <input
                type="text"
                value={question.image_url}
                onChange={(e) => onUpdate('image_url', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-500"
                placeholder="/images/exams/..."
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">
                Legenda
              </label>
              <input
                type="text"
                value={question.image_caption}
                onChange={(e) => onUpdate('image_caption', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-500"
                placeholder="Legenda da imagem"
              />
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Opções</label>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdate('correct_answer', option.letter)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                      question.correct_answer === option.letter
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {option.letter}
                  </button>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => onUpdateOption(oIndex, e.target.value)}
                    className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-500"
                    placeholder={`Opção ${option.letter}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-2">
              Clique na letra para marcar a resposta correta
            </p>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm text-white/60 mb-2">
              Explicação (exibida após responder)
            </label>
            <textarea
              value={question.explanation}
              onChange={(e) => onUpdate('explanation', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-yellow-500 resize-none"
              rows={2}
              placeholder="Explique a resposta correta..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManager;
