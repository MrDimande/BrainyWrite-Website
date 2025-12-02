// Email templates for BrainyWrite

const emailTemplates = {
  // Contact form notification
  contactNotification: (data) => ({
    subject: `Nova Mensagem de Contato - ${data.assunto}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Nova Mensagem de Contato</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Detalhes da Mensagem</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Nome:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.nome} ${data.apelido}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Telefone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.telefone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Assunto:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.assunto}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #666; vertical-align: top;">Mensagem:</td>
              <td style="padding: 10px; color: #333;">${(data.mensagem || '').replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
            <p style="margin: 0; color: #92400e;">Por favor, responda a esta mensagem o mais breve possível.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>BrainyWrite - Consultoria Acadêmica e Profissional</p>
        </div>
      </div>
    `,
  }),

  // Quote request notification
  quoteNotification: (data) => ({
    subject: `Nova Solicitação de Cotação - ${data.workType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Nova Solicitação de Cotação</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Detalhes da Cotação</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Nome:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Telefone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Instituição:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.institution || 'Não informado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Tipo de Trabalho:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.workType || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Páginas:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.pages || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Prazo:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.deadline || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Nível Acadêmico:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.academicLevel || 'Não informado'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Preço Calculado:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #f59e0b; font-weight: bold; font-size: 18px;">${data.calculatedPrice ? `${parseFloat(data.calculatedPrice).toLocaleString('pt-MZ')} MT` : 'A calcular'}</td>
            </tr>
            ${data.title ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Título:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.title}</td>
            </tr>
            ` : ''}
            ${data.description ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #666; vertical-align: top;">Descrição:</td>
              <td style="padding: 10px; color: #333;">${(data.description || '').replace(/\n/g, '<br>')}</td>
            </tr>
            ` : ''}
          </table>
          ${data.additionalServices && data.additionalServices.length > 0 ? `
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Serviços Adicionais:</h3>
            <ul style="color: #333;">
              ${data.additionalServices.map(service => `<li>${service}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
            <p style="margin: 0; color: #92400e;">Por favor, entre em contato com o cliente para confirmar a cotação e discutir os detalhes.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>BrainyWrite - Consultoria Acadêmica e Profissional</p>
        </div>
      </div>
    `,
  }),

  // Appointment booking notification
  appointmentNotification: (data) => ({
    subject: `Novo Agendamento - ${data.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Novo Agendamento</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Detalhes do Agendamento</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Nome:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Telefone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Serviço:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.service || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Data:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.date ? new Date(data.date).toLocaleDateString('pt-MZ') : 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Hora:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${data.time || 'N/A'}</td>
            </tr>
            ${data.message ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #666; vertical-align: top;">Mensagem:</td>
              <td style="padding: 10px; color: #333;">${(data.message || '').replace(/\n/g, '<br>')}</td>
            </tr>
            ` : ''}
          </table>
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
            <p style="margin: 0; color: #92400e;">Por favor, confirme o agendamento com o cliente e adicione ao calendário.</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>BrainyWrite - Consultoria Acadêmica e Profissional</p>
        </div>
      </div>
    `,
  }),

  // Newsletter confirmation
  newsletterConfirmation: (email) => ({
    subject: 'Bem-vindo à Newsletter da BrainyWrite!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Bem-vindo à BrainyWrite!</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Obrigado por se inscrever!</h2>
          <p style="color: #666; line-height: 1.6;">
            Olá!<br><br>
            Obrigado por se inscrever na nossa newsletter. Você receberá atualizações sobre nossos serviços,
            dicas acadêmicas, artigos do blog e muito mais!
          </p>
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
            <p style="margin: 0; color: #92400e;">
              <strong>O que você pode esperar:</strong><br>
              • Dicas e guias acadêmicos<br>
              • Novidades sobre nossos serviços<br>
              • Artigos e conteúdos exclusivos<br>
              • Ofertas e promoções especiais
            </p>
          </div>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            Se você tiver alguma dúvida, não hesite em nos contatar.<br><br>
            Atenciosamente,<br>
            <strong>Equipe BrainyWrite</strong>
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>BrainyWrite - Consultoria Acadêmica e Profissional</p>
          <p>Av. Julius Nyerere, Polana Canico B, Maputo, Moçambique</p>
        </div>
      </div>
    `,
  }),
};

module.exports = {
  emailTemplates,
};

