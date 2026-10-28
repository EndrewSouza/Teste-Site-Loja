/* =========================================
   MANAUS AUTO PEÇAS – script.js (sem bibliotecas)
   ========================================= */

/* >>> COLE AQUI OS LINKS DAS LOJAS <<<
   Enquanto estiver vazio, o botão abre o WhatsApp da loja. */
const LINKS = {
  mercadolivre: 'https://www.mercadolivre.com.br/pagina/manausauto',
  shopee: 'https://shopee.com.br/manausautopecas'
};

const WHATSAPP = '5592991266860';

const waLink = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

/* Links do Mercado Livre e da Shopee */
const NOMES = { mercadolivre: 'Mercado Livre', shopee: 'Shopee' };
document.querySelectorAll('[data-link]').forEach((a) => {
  const chave = a.dataset.link;
  a.href = LINKS[chave] || waLink(`Olá! Vi o site e queria o link da loja de vocês na ${NOMES[chave]}.`);
});

/* Menu do celular */
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const setMenu = (aberto) => {
  nav.classList.toggle('open', aberto);
  menuBtn.setAttribute('aria-expanded', aberto);
  menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  menuBtn.querySelector('use').setAttribute('href', aberto ? '#i-close' : '#i-menu');
};
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

/* Clicar numa categoria já preenche a peça no formulário */
const campoPeca = document.getElementById('f-peca');
document.querySelectorAll('.cat[data-peca]').forEach((c) => {
  c.addEventListener('click', () => {
    campoPeca.value = c.dataset.peca;
    setTimeout(() => campoPeca.focus({ preventScroll: true }), 400);
  });
});

/* Formulário de orçamento -> WhatsApp */
const form = document.getElementById('quote-form');
const erro = document.getElementById('form-error');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v = (id) => document.getElementById(id).value.trim();
  const obrigatorios = ['f-peca', 'f-carro'];
  let ok = true;
  obrigatorios.forEach((id) => {
    const el = document.getElementById(id);
    const vazio = !el.value.trim();
    el.classList.toggle('error', vazio);
    if (vazio) ok = false;
  });
  erro.hidden = ok;
  if (!ok) return;

  const linhas = [
    'Olá! Vim pelo site e quero um orçamento.',
    `Peça: ${v('f-peca')}`,
    `Carro: ${v('f-carro')}${v('f-ano') ? ' ' + v('f-ano') : ''}`
  ];
  if (v('f-nome')) linhas.push(`Nome: ${v('f-nome')}`);
  window.open(waLink(linhas.join('\n')), '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
