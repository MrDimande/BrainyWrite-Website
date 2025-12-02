import jsPDF from 'jspdf';

/**
 * Generate a PDF certificate for exam completion
 */
export const generateCertificatePDF = ({
  fullName,
  examTitle,
  subjectName,
  score,
  certificateCode,
  completedAt,
}) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background gradient effect (simulated with rectangles)
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, width, height, 'F');

  // Gold border
  doc.setDrawColor(234, 179, 8);
  doc.setLineWidth(3);
  doc.rect(10, 10, width - 20, height - 20);

  // Inner border
  doc.setLineWidth(0.5);
  doc.rect(15, 15, width - 30, height - 30);

  // Header decoration
  doc.setFillColor(234, 179, 8);
  doc.rect(width / 2 - 40, 20, 80, 2, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(234, 179, 8);
  doc.text('CERTIFICADO', width / 2, 45, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text('DE CONCLUSÃO', width / 2, 55, { align: 'center' });

  // Decorative line
  doc.setFillColor(234, 179, 8);
  doc.rect(width / 2 - 30, 60, 60, 1, 'F');

  // Certificate text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(180, 180, 180);
  doc.text('Certificamos que', width / 2, 80, { align: 'center' });

  // Student name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text(fullName, width / 2, 95, { align: 'center' });

  // Completion text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(180, 180, 180);
  doc.text('concluiu com êxito o exame', width / 2, 110, { align: 'center' });

  // Exam title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(234, 179, 8);
  doc.text(examTitle, width / 2, 125, { align: 'center' });

  // Subject
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text(`Disciplina: ${subjectName}`, width / 2, 138, { align: 'center' });

  // Score
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(34, 197, 94); // Green
  doc.text(`Pontuação: ${score.toFixed(1)}%`, width / 2, 152, { align: 'center' });

  // Date
  const formattedDate = new Date(completedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(150, 150, 150);
  doc.text(`Concluído em ${formattedDate}`, width / 2, 165, { align: 'center' });

  // Certificate code
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Código de verificação: ${certificateCode}`, width / 2, 175, { align: 'center' });

  // Footer
  doc.setFillColor(234, 179, 8);
  doc.rect(width / 2 - 40, 182, 80, 1, 'F');

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('BrainyForge - Plataforma de Testes Educacionais', width / 2, 190, { align: 'center' });
  doc.text('Verifique este certificado em: brainywrite.com/verify', width / 2, 196, { align: 'center' });

  return doc;
};

/**
 * Generate a PDF report of user progress
 */
export const generateProgressPDF = ({
  fullName,
  overallStats,
  subjectProgress,
  recentAttempts,
  achievements,
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth();
  let y = 20;

  // Header
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, width, 40, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(234, 179, 8);
  doc.text('Relatório de Progresso', 20, 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text(fullName, width - 20, 28, { align: 'right' });

  y = 55;

  // Overall Stats Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text('Estatísticas Gerais', 20, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);

  const stats = [
    ['Total de Exames', overallStats.totalExams.toString()],
    ['Média Geral', `${overallStats.averageScore.toFixed(1)}%`],
    ['Taxa de Aprovação', `${overallStats.passRate.toFixed(1)}%`],
    ['Tempo Total de Estudo', formatTime(overallStats.totalTimeSpent)],
  ];

  stats.forEach(([label, value]) => {
    doc.text(`${label}:`, 25, y);
    doc.setFont('helvetica', 'bold');
    doc.text(value, 80, y);
    doc.setFont('helvetica', 'normal');
    y += 7;
  });

  y += 10;

  // Subject Progress Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text('Progresso por Disciplina', 20, y);
  y += 10;

  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, y - 5, width - 40, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text('Disciplina', 25, y);
  doc.text('Exames', 90, y);
  doc.text('Média', 120, y);
  doc.text('Melhor', 150, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  subjectProgress.forEach((subject) => {
    doc.text(subject.subject, 25, y);
    doc.text(subject.totalExamsTaken.toString(), 90, y);
    doc.text(`${subject.averageScore.toFixed(1)}%`, 120, y);
    doc.text(`${subject.highestScore.toFixed(1)}%`, 150, y);
    y += 7;
  });

  y += 10;

  // Achievements Section
  if (achievements && achievements.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.text('Conquistas', 20, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    achievements.forEach((achievement) => {
      doc.text(`${achievement.icon} ${achievement.name}`, 25, y);
      doc.setTextColor(120, 120, 120);
      doc.text(achievement.desc, 80, y);
      doc.setTextColor(80, 80, 80);
      y += 7;
    });
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Gerado em ${new Date().toLocaleDateString('pt-BR')} - BrainyForge`,
    width / 2,
    footerY,
    { align: 'center' }
  );

  return doc;
};

// Helper function
const formatTime = (seconds) => {
  if (!seconds) return '0min';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes}min`;
};

/**
 * Download PDF
 */
export const downloadPDF = (doc, filename) => {
  doc.save(filename);
};

/**
 * Get PDF as blob for email attachment
 */
export const getPDFBlob = (doc) => {
  return doc.output('blob');
};
