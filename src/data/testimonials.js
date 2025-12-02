export const testimonials = [
  {
    id: 1,
    name: "Carlos M.",
    role: "Estudante de Licenciatura",
    institution: "Universidade Eduardo Mondlane",
    image: "/images/testimonials/carlos.jpg",
    rating: 5,
    text: "A assessoria da BrainyWrite foi fundamental para o sucesso da minha monografia. O profissionalismo e qualidade excepcionais superaram minhas expectativas. Recebi nota 18/20 e recomendo sem hesitação!",
    service: "Produção de Trabalhos Académicos",
    project: "Monografia em Planeamento Territorial",
    date: "2024"
  },
  {
    id: 2,
    name: "Ana S.",
    role: "Mestranda",
    institution: "UNISA",
    image: "/images/testimonials/ana.jpg",
    rating: 5,
    text: "A estruturação do meu projeto de pesquisa foi perfeita. Agora tenho clareza total sobre como desenvolver minha dissertação. A equipe da BrainyWrite é realmente especializada e dedicada!",
    service: "Projetos de Pesquisa",
    project: "Projeto de Pesquisa em Desenvolvimento Urbano",
    date: "2024"
  },
  {
    id: 3,
    name: "Dr. João M.",
    role: "Doutorando",
    institution: "UCM",
    image: "/images/testimonials/joao.jpg",
    rating: 5,
    text: "A assessoria especializada da BrainyWrite elevou significativamente a qualidade da minha tese. O conhecimento profundo em Planeamento Territorial e a atenção aos detalhes são impressionantes.",
    service: "Teses de Doutoramento",
    project: "Tese de Doutoramento em Ordenamento Territorial",
    date: "2024"
  },
  {
    id: 4,
    name: "Maria L.",
    role: "Estudante",
    institution: "Universidade Pedagógica",
    image: "/images/testimonials/maria.jpg",
    rating: 5,
    text: "O acompanhamento online transformou minha jornada acadêmica. A tutoria personalizada e o suporte 24/7 fizeram toda a diferença. Consegui aprovar todas as disciplinas com excelência!",
    service: "Acompanhamento Online",
    project: "Tutoria em Metodologia de Pesquisa",
    date: "2024"
  },
  {
    id: 5,
    name: "Pedro C.",
    role: "Engenheiro Ambiental",
    institution: "Profissional",
    image: "/images/testimonials/pedro.jpg",
    rating: 5,
    text: "A qualidade técnica do relatório desenvolvido foi excepcional. Contribuiu decisivamente para a aprovação do projeto de expansão portuária. Profissionais altamente qualificados!",
    service: "Relatórios Técnicos",
    project: "Relatório de Avaliação Ambiental",
    date: "2024"
  },
  {
    id: 6,
    name: "Sofia A.",
    role: "Profissional",
    institution: "Consultora",
    image: "/images/testimonials/sofia.jpg",
    rating: 5,
    text: "A consultoria profissional da BrainyWrite transformou minha carreira. Com o CV otimizado e estratégia de personal branding, consegui oportunidades que nunca imaginei. Recomendo muito!",
    service: "Consultoria Profissional",
    project: "Desenvolvimento de Carreira",
    date: "2024"
  }
];

export const getFeaturedTestimonials = (limit = 3) => {
  return testimonials.slice(0, limit);
};

export const getTestimonialsByService = (serviceType) => {
  return testimonials.filter(testimonial =>
    testimonial.service.toLowerCase().includes(serviceType.toLowerCase())
  );
};

