// Configuração central do site: identidade, contatos e redes.
// Textos que mudam com o idioma (título, descrição, mensagens do WhatsApp) ficam em data/i18n.mjs.

export const site = {
  url: 'https://devluisam.github.io',
  name: 'Luis Henrique Azevedo',
  fullName: 'Luis Henrique Azevedo de Oliveira',
  city: 'Manaus, AM',
  ogImage: '/img/og.jpg',
  themeColor: '#0b0b0a',

  contact: {
    whatsapp: '5592981295937',
    whatsappDisplay: '+55 (92) 98129-5937',
    email: 'devluisam@gmail.com',
  },

  social: {
    instagram: { label: '@devluisam', url: 'https://www.instagram.com/devluisam/' },
    github: { label: '@devluisam', url: 'https://github.com/devluisam' },
    linkedin: { label: 'Luis Henrique', url: 'https://www.linkedin.com/in/luis-henrique-94a6183b3' },
  },

  // Página de vendas de sites para negócios locais (outro repositório, em português).
  salesPage: 'https://devluisam.github.io/sites/',
};

/** Link do WhatsApp com mensagem pronta. */
export function whatsappUrl(message) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
