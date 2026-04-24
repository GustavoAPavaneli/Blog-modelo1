'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [announceHidden, setAnnounceHidden] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [cookieHidden, setCookieHidden] = useState(false);
  const [backTopVisible, setBackTopVisible] = useState(false);
  const readingBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('announceClosed')) setAnnounceHidden(true);
    if (!localStorage.getItem('cookiesAccepted')) setCookieVisible(true);
    else setCookieHidden(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (readingBarRef.current) readingBarRef.current.style.width = (pct * 100) + '%';
      setBackTopVisible(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }

  function closeAnnounce() {
    setAnnounceHidden(true);
    sessionStorage.setItem('announceClosed', '1');
  }

  function acceptCookies() {
    setCookieVisible(false);
    setCookieHidden(true);
    localStorage.setItem('cookiesAccepted', '1');
  }

  return (
    <>
      <div id="reading-bar" ref={readingBarRef}></div>

      {/* Announcement Bar */}
      <div className={`announce-bar${announceHidden ? ' hidden' : ''}`} id="announceBar">
        🎉 <strong>Novidade:</strong> Confira nossa série especial de conteúdos sobre [tema em destaque].
        <a href="#">Acessar agora →</a>
        <button className="announce-close" onClick={closeAnnounce} aria-label="Fechar">✕</button>
      </div>

      {/* Header */}
      <header>
        <div className="header-inner">
          <div className="logo">[ SUA LOGO AQUI ]</div>
          <nav>
            <a href="#" className="active">Início</a>
            <a href="#">Categorias</a>
            <a href="#">Sobre</a>
            <a href="#">Contato</a>
          </nav>
          <div className="header-actions">
            <div className="search-wrap">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="search" placeholder="Buscar no blog..." />
            </div>
            <button className="btn-subscribe">Assinar</button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar modo escuro/claro">
            <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>
          <div className={`hamburger${mobileNavOpen ? ' open' : ''}`} id="hamburger" onClick={() => setMobileNavOpen(p => !p)} aria-label="Abrir menu">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`} id="mobileNav">
          <a href="#">Início</a>
          <a href="#">Categorias</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <div className="mobile-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="search" placeholder="Buscar no blog..." />
          </div>
          <button className="btn-subscribe">Assinar</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" aria-label="Post em destaque">
        <div className="hero-inner">
          <div className="hero-image">
            <img src="https://picsum.photos/id/1018/700/460" alt="Imagem do post em destaque" />
          </div>
          <div className="hero-content">
            <div className="hero-meta">
              <span className="tag">Categoria do Post</span>
              <span className="meta-text">22 de abril de 2026</span>
              <span className="meta-text">· 5 min de leitura</span>
            </div>
            <h1 className="hero-title">Aqui vai o título do post em destaque — chamativo, claro e direto ao ponto</h1>
            <p className="hero-excerpt">Aqui ficará o trecho de abertura do post em destaque. Esse texto deve despertar a curiosidade do leitor e convidá-lo a continuar lendo. Substitua por um resumo real do conteúdo principal.</p>
            <div className="hero-author">
              <img className="author-avatar" src="https://picsum.photos/id/1005/40/40" alt="Foto do autor" />
              <div>
                <div className="author-name">Nome do Autor</div>
                <div className="author-role">Cargo ou especialidade do autor</div>
              </div>
            </div>
            <a href="#" className="btn-primary">Ler mais →</a>
          </div>
        </div>
      </section>

      {/* Em Alta Strip */}
      <section className="hot-strip reveal" aria-label="Em alta esta semana">
        <div className="hot-strip-inner">
          <div className="hot-strip-header">
            <span className="hot-strip-title">
              <span className="hot-badge">Em Alta</span>
              Esta Semana
            </span>
            <a href="#" className="hot-see-all">Ver todos <span>→</span></a>
          </div>
          <div className="hot-grid">
            <a href="#" className="hot-card">
              <div className="hot-thumb">
                <img src="https://picsum.photos/id/48/90/68" alt="Post em alta 1" loading="lazy" />
                <span className="hot-num">#1</span>
              </div>
              <div className="hot-info">
                <span className="tag outline" style={{ alignSelf: 'flex-start', fontSize: '.65rem' }}>Categoria A</span>
                <span className="hot-title">Título do post mais acessado desta semana no blog</span>
                <div className="hot-meta">
                  <span>20 abr.</span><span>· 3 min</span><span>· 4.2k views</span>
                </div>
              </div>
            </a>
            <a href="#" className="hot-card">
              <div className="hot-thumb">
                <img src="https://picsum.photos/id/20/90/68" alt="Post em alta 2" loading="lazy" />
                <span className="hot-num">#2</span>
              </div>
              <div className="hot-info">
                <span className="tag outline" style={{ alignSelf: 'flex-start', fontSize: '.65rem' }}>Categoria B</span>
                <span className="hot-title">Segundo post mais lido com um título representativo</span>
                <div className="hot-meta">
                  <span>18 abr.</span><span>· 5 min</span><span>· 3.1k views</span>
                </div>
              </div>
            </a>
            <a href="#" className="hot-card">
              <div className="hot-thumb">
                <img src="https://picsum.photos/id/119/90/68" alt="Post em alta 3" loading="lazy" />
                <span className="hot-num">#3</span>
              </div>
              <div className="hot-info">
                <span className="tag outline" style={{ alignSelf: 'flex-start', fontSize: '.65rem' }}>Categoria C</span>
                <span className="hot-title">Terceiro post em alta — outro exemplo de conteúdo popular</span>
                <div className="hot-meta">
                  <span>15 abr.</span><span>· 7 min</span><span>· 2.8k views</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Page Body */}
      <div className="page-body">
        <main>
          <p className="section-label reveal" style={{ '--delay': '.05s' } as React.CSSProperties}>Posts Recentes</p>
          <p className="posts-meta reveal" style={{ '--delay': '.07s' } as React.CSSProperties}>Exibindo 1–5 de 48 artigos</p>

          {/* Post 1 */}
          <article className="post-card reveal" style={{ '--delay': '.08s' } as React.CSSProperties}>
            <a href="#" className="post-thumb">
              <img src="https://picsum.photos/id/0/200/140" alt="Miniatura post 1" loading="lazy" />
            </a>
            <div className="post-info">
              <div className="post-tags"><span className="tag outline">Categoria A</span></div>
              <a href="#"><h2 className="post-title">Título do Primeiro Post Recente — Coloque aqui um título claro e informativo</h2></a>
              <p className="post-excerpt">Aqui vai um trecho curto do artigo para dar ao leitor uma ideia do que será abordado. Esse texto vem automaticamente do conteúdo do post e pode ser personalizado.</p>
              <div className="post-footer">
                <img className="post-author-avatar" src="https://picsum.photos/id/1005/20/20" alt="Autor" />
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> 20 abr. 2026</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 4 min</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> 1.2k</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 45</span>
              </div>
              <div className="post-share">
                <span className="post-share-label">Compartilhar:</span>
                <a href="#" className="share-btn tw" aria-label="Compartilhar no X"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                <a href="#" className="share-btn wa" aria-label="Compartilhar no WhatsApp"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></a>
                <a href="#" className="share-btn li" aria-label="Compartilhar no LinkedIn"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              </div>
            </div>
          </article>

          {/* Post 2 */}
          <article className="post-card reveal" style={{ '--delay': '.16s' } as React.CSSProperties}>
            <a href="#" className="post-thumb">
              <img src="https://picsum.photos/id/160/200/140" alt="Miniatura post 2" loading="lazy" />
            </a>
            <div className="post-info">
              <div className="post-tags"><span className="tag outline">Categoria B</span></div>
              <a href="#"><h2 className="post-title">Título do Segundo Post Recente — Outro exemplo de artigo na listagem principal</h2></a>
              <p className="post-excerpt">Trecho de apresentação do segundo artigo. Este espaço exibirá os primeiros parágrafos ou um resumo personalizado para ajudar o leitor a decidir se quer continuar.</p>
              <div className="post-footer">
                <img className="post-author-avatar" src="https://picsum.photos/id/1005/20/20" alt="Autor" />
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> 18 abr. 2026</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 6 min</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> 980</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 31</span>
              </div>
              <div className="post-share">
                <span className="post-share-label">Compartilhar:</span>
                <a href="#" className="share-btn tw" aria-label="X"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                <a href="#" className="share-btn wa" aria-label="WhatsApp"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></a>
                <a href="#" className="share-btn li" aria-label="LinkedIn"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              </div>
            </div>
          </article>

          {/* Post 3 */}
          <article className="post-card reveal" style={{ '--delay': '.24s' } as React.CSSProperties}>
            <a href="#" className="post-thumb">
              <img src="https://picsum.photos/id/10/200/140" alt="Miniatura post 3" loading="lazy" />
            </a>
            <div className="post-info">
              <div className="post-tags"><span className="tag outline">Categoria C</span></div>
              <a href="#"><h2 className="post-title">Título do Terceiro Post Recente — Mais um exemplo com temática diferente</h2></a>
              <p className="post-excerpt">Descrição resumida do terceiro artigo. O conteúdo real virá do seu CMS e pode incluir as primeiras linhas do texto ou um resumo escrito pelo autor.</p>
              <div className="post-footer">
                <img className="post-author-avatar" src="https://picsum.photos/id/1005/20/20" alt="Autor" />
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> 15 abr. 2026</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 3 min</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> 760</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 22</span>
              </div>
              <div className="post-share">
                <span className="post-share-label">Compartilhar:</span>
                <a href="#" className="share-btn tw" aria-label="X"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                <a href="#" className="share-btn wa" aria-label="WhatsApp"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></a>
                <a href="#" className="share-btn li" aria-label="LinkedIn"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              </div>
            </div>
          </article>

          {/* Post 4 */}
          <article className="post-card reveal" style={{ '--delay': '.32s' } as React.CSSProperties}>
            <a href="#" className="post-thumb">
              <img src="https://picsum.photos/id/376/200/140" alt="Miniatura post 4" loading="lazy" />
            </a>
            <div className="post-info">
              <div className="post-tags"><span className="tag outline">Categoria A</span></div>
              <a href="#"><h2 className="post-title">Título do Quarto Post — Observe como o layout acomoda títulos mais longos mantendo consistência visual</h2></a>
              <p className="post-excerpt">Aqui vai um resumo do quarto artigo. Note que mesmo com um título longo o layout mantém a hierarquia visual e a legibilidade da listagem de posts.</p>
              <div className="post-footer">
                <img className="post-author-avatar" src="https://picsum.photos/id/1005/20/20" alt="Autor" />
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> 12 abr. 2026</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 7 min</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> 540</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 18</span>
              </div>
              <div className="post-share">
                <span className="post-share-label">Compartilhar:</span>
                <a href="#" className="share-btn tw" aria-label="X"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                <a href="#" className="share-btn wa" aria-label="WhatsApp"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></a>
                <a href="#" className="share-btn li" aria-label="LinkedIn"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              </div>
            </div>
          </article>

          {/* Post 5 */}
          <article className="post-card reveal" style={{ '--delay': '.40s' } as React.CSSProperties}>
            <a href="#" className="post-thumb">
              <img src="https://picsum.photos/id/250/200/140" alt="Miniatura post 5" loading="lazy" />
            </a>
            <div className="post-info">
              <div className="post-tags"><span className="tag outline">Categoria D</span></div>
              <a href="#"><h2 className="post-title">Título do Quinto Post Recente — Último artigo da primeira página do blog</h2></a>
              <p className="post-excerpt">Trecho de apresentação do quinto artigo. O número de posts por página é configurável — pode ser 5, 8, 10 ou o que fizer mais sentido para o seu blog.</p>
              <div className="post-footer">
                <img className="post-author-avatar" src="https://picsum.photos/id/1005/20/20" alt="Autor" />
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> 10 abr. 2026</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> 5 min</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> 390</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> 14</span>
              </div>
              <div className="post-share">
                <span className="post-share-label">Compartilhar:</span>
                <a href="#" className="share-btn tw" aria-label="X"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                <a href="#" className="share-btn wa" aria-label="WhatsApp"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg></a>
                <a href="#" className="share-btn li" aria-label="LinkedIn"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              </div>
            </div>
          </article>

          {/* Pagination */}
          <nav className="pagination reveal" style={{ '--delay': '.48s' } as React.CSSProperties} aria-label="Páginas">
            <a href="#" className="page-btn disabled">← Anterior</a>
            <a href="#" className="page-btn current" aria-current="page">1</a>
            <a href="#" className="page-btn">2</a>
            <a href="#" className="page-btn">3</a>
            <span className="dots">…</span>
            <a href="#" className="page-btn">8</a>
            <a href="#" className="page-btn">Próxima →</a>
          </nav>

          {/* More in Main */}
          <div className="more-in-main">
            <p className="section-label reveal" style={{ '--delay': '.05s', marginBottom: '20px' } as React.CSSProperties}>Explore Mais Conteúdos</p>
            <div className="cards-grid">

              <a href="#" className="card reveal" style={{ '--delay': '.10s' } as React.CSSProperties}>
                <div className="card-image">
                  <img src="https://picsum.photos/id/42/400/180" alt="Post 6" loading="lazy" />
                  <div className="card-image-overlay"></div>
                  <span className="card-category-float">Categoria A</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Título do Sexto Post — Exemplo de card em grade de duas colunas</h3>
                  <p className="card-excerpt">Aqui vai um resumo do artigo. Esse layout em grade é ótimo para apresentar conteúdos de forma visual e atraente.</p>
                  <div className="card-footer">
                    <div className="card-author"><img src="https://picsum.photos/id/1005/24/24" alt="Autor" /><span className="card-author-name">Nome do Autor</span></div>
                    <div className="card-meta"><span>8 abr.</span><span>· 4 min</span></div>
                  </div>
                </div>
              </a>

              <a href="#" className="card reveal" style={{ '--delay': '.18s' } as React.CSSProperties}>
                <div className="card-image">
                  <img src="https://picsum.photos/id/96/400/180" alt="Post 7" loading="lazy" />
                  <div className="card-image-overlay"></div>
                  <span className="card-category-float">Categoria B</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Título do Sétimo Post — Outro exemplo com imagem diferente no card</h3>
                  <p className="card-excerpt">O resumo aparece abaixo da imagem. Você pode usar uma foto real ou gerada automaticamente pelo sistema.</p>
                  <div className="card-footer">
                    <div className="card-author"><img src="https://picsum.photos/id/1005/24/24" alt="Autor" /><span className="card-author-name">Nome do Autor</span></div>
                    <div className="card-meta"><span>6 abr.</span><span>· 6 min</span></div>
                  </div>
                </div>
              </a>

              <a href="#" className="card reveal" style={{ '--delay': '.26s' } as React.CSSProperties}>
                <div className="card-image">
                  <img src="https://picsum.photos/id/133/400/180" alt="Post 8" loading="lazy" />
                  <div className="card-image-overlay"></div>
                  <span className="card-category-float">Categoria C</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Título do Oitavo Post — Terceiro card da grade de exploração</h3>
                  <p className="card-excerpt">Cada card exibe imagem em destaque, categoria, título, resumo, autor e data. Layout responsivo automático.</p>
                  <div className="card-footer">
                    <div className="card-author"><img src="https://picsum.photos/id/1005/24/24" alt="Autor" /><span className="card-author-name">Nome do Autor</span></div>
                    <div className="card-meta"><span>4 abr.</span><span>· 5 min</span></div>
                  </div>
                </div>
              </a>

              <a href="#" className="card reveal" style={{ '--delay': '.34s' } as React.CSSProperties}>
                <div className="card-image">
                  <img src="https://picsum.photos/id/180/400/180" alt="Post 9" loading="lazy" />
                  <div className="card-image-overlay"></div>
                  <span className="card-category-float">Categoria D</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Título do Nono Post — Segunda linha de cards desta grade</h3>
                  <p className="card-excerpt">A grade pode exibir quantas linhas forem necessárias, sem limite. Basta adicionar mais cards ao código.</p>
                  <div className="card-footer">
                    <div className="card-author"><img src="https://picsum.photos/id/1005/24/24" alt="Autor" /><span className="card-author-name">Nome do Autor</span></div>
                    <div className="card-meta"><span>2 abr.</span><span>· 3 min</span></div>
                  </div>
                </div>
              </a>

              <a href="#" className="card reveal" style={{ '--delay': '.42s' } as React.CSSProperties}>
                <div className="card-image">
                  <img src="https://picsum.photos/id/214/400/180" alt="Post 10" loading="lazy" />
                  <div className="card-image-overlay"></div>
                  <span className="card-category-float">Categoria A</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Título do Décimo Post — Penúltimo card da grade de exemplo</h3>
                  <p className="card-excerpt">O hover levanta o card com sombra e o título muda de cor, dando sensação de profundidade e interatividade.</p>
                  <div className="card-footer">
                    <div className="card-author"><img src="https://picsum.photos/id/1005/24/24" alt="Autor" /><span className="card-author-name">Nome do Autor</span></div>
                    <div className="card-meta"><span>30 mar.</span><span>· 7 min</span></div>
                  </div>
                </div>
              </a>

              <a href="#" className="card reveal" style={{ '--delay': '.50s' } as React.CSSProperties}>
                <div className="card-image">
                  <img src="https://picsum.photos/id/292/400/180" alt="Post 11" loading="lazy" />
                  <div className="card-image-overlay"></div>
                  <span className="card-category-float">Categoria B</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Título do Décimo Primeiro Post — Último card desta seção</h3>
                  <p className="card-excerpt">Fechando a grade com seis posts no total. Abaixo desta seção, a sidebar continua com tags e newsletter.</p>
                  <div className="card-footer">
                    <div className="card-author"><img src="https://picsum.photos/id/1005/24/24" alt="Autor" /><span className="card-author-name">Nome do Autor</span></div>
                    <div className="card-meta"><span>28 mar.</span><span>· 4 min</span></div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">

          {/* Sobre */}
          <div className="sidebar-card about-card reveal from-right" style={{ '--delay': '.10s' } as React.CSSProperties}>
            <h3>Sobre o Blog</h3>
            <img className="about-avatar" src="https://picsum.photos/id/1005/82/82" alt="Foto do autor" loading="lazy" />
            <div className="about-name">Nome do Autor ou Blog</div>
            <p className="about-desc">Aqui vai uma breve descrição sobre você ou sobre o blog — quem você é, o que escreve e por que o leitor deveria te seguir.</p>
            <div className="social-links">
              <a href="#" className="social-btn ig" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" className="social-btn tw" aria-label="X / Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="#" className="social-btn yt" aria-label="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" className="social-btn li" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              <a href="#" className="social-btn fb" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            </div>
          </div>

          {/* Posts mais lidos */}
          <div className="sidebar-card reveal from-right" style={{ '--delay': '.20s' } as React.CSSProperties}>
            <h3>Posts Mais Lidos</h3>
            <ul className="most-read-list">
              <li><span className="rank-num">01</span><a href="#" className="most-read-title">Título do post mais acessado de todos os tempos no blog</a></li>
              <li><span className="rank-num">02</span><a href="#" className="most-read-title">Segundo post mais acessado — título descritivo aqui</a></li>
              <li><span className="rank-num">03</span><a href="#" className="most-read-title">Terceiro post mais popular entre os leitores do blog</a></li>
              <li><span className="rank-num">04</span><a href="#" className="most-read-title">Quarto título da lista de conteúdos mais acessados</a></li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="sidebar-card reveal from-right" style={{ '--delay': '.28s' } as React.CSSProperties}>
            <h3>Categorias</h3>
            <ul className="categories-list">
              <li><a href="#">Nome da Categoria A</a><span className="cat-count">24 posts</span></li>
              <li><a href="#">Nome da Categoria B</a><span className="cat-count">18 posts</span></li>
              <li><a href="#">Nome da Categoria C</a><span className="cat-count">12 posts</span></li>
              <li><a href="#">Nome da Categoria D</a><span className="cat-count">9 posts</span></li>
              <li><a href="#">Nome da Categoria E</a><span className="cat-count">5 posts</span></li>
            </ul>
          </div>

          {/* Anúncio */}
          <div className="ad-card reveal from-right" style={{ '--delay': '.34s' } as React.CSSProperties}>
            <p className="ad-label">Espaço para anúncio</p>
            <div className="ad-placeholder">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              <span>Banner do anunciante</span>
            </div>
            <p className="ad-sizes">Tamanhos suportados: 300×250 · 300×600</p>
          </div>

          {/* Tags */}
          <div className="sidebar-card reveal from-right" style={{ '--delay': '.40s' } as React.CSSProperties}>
            <h3>Nuvem de Tags</h3>
            <div className="tag-cloud">
              <a href="#" className="tag-pill">tag-principal</a>
              <a href="#" className="tag-pill">sua-tag</a>
              <a href="#" className="tag-pill">exemplo</a>
              <a href="#" className="tag-pill">tema-do-blog</a>
              <a href="#" className="tag-pill">assunto</a>
              <a href="#" className="tag-pill">conteúdo</a>
              <a href="#" className="tag-pill">dicas</a>
              <a href="#" className="tag-pill">tutorial</a>
              <a href="#" className="tag-pill">novidades</a>
              <a href="#" className="tag-pill">referência</a>
              <a href="#" className="tag-pill">guia</a>
              <a href="#" className="tag-pill">série</a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sidebar-card reveal from-right" style={{ '--delay': '.50s' } as React.CSSProperties}>
            <h3>Newsletter</h3>
            <p className="newsletter-desc">Receba os melhores conteúdos diretamente no seu e-mail. Sem spam — apenas o que realmente importa.</p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="seu@email.com" aria-label="E-mail" />
              <button type="submit" className="btn-newsletter">Quero receber ✓</button>
            </form>
          </div>

        </aside>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">[ SUA LOGO AQUI ]</div>
            <p className="footer-about">Breve descrição do blog no rodapé — missão, proposta de valor ou slogan. Este texto ajuda visitantes a entender rapidamente sobre o que é o seu blog.</p>
            <div className="footer-social">
              <a href="#" className="footer-social-btn" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" className="footer-social-btn" aria-label="X / Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="#" className="footer-social-btn" aria-label="YouTube"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" className="footer-social-btn" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              <a href="#" className="footer-social-btn" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><a href="#">Início</a></li>
              <li><a href="#">Categorias</a></li>
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">RSS Feed</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Categorias em Destaque</h4>
            <ul className="footer-links">
              <li><a href="#">Nome da Categoria A</a></li>
              <li><a href="#">Nome da Categoria B</a></li>
              <li><a href="#">Nome da Categoria C</a></li>
              <li><a href="#">Nome da Categoria D</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Nome do Seu Blog — Todos os direitos reservados</span>
          <span>Desenvolvido por <a href="#">Sua Agência / Dev</a></span>
        </div>
      </footer>

      {/* Back to Top */}
      <button
        className={`back-top${backTopVisible ? ' visible' : ''}`}
        id="backTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* Cookie Banner */}
      <div className={`cookie-banner${cookieVisible ? ' visible' : ''}${cookieHidden ? ' hidden' : ''}`} id="cookieBanner">
        <div className="cookie-inner">
          <span className="cookie-icon">🍪</span>
          <div className="cookie-text">
            <strong>Este site usa cookies</strong>
            <p>Usamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego. Ao continuar, você concorda com nossa <a href="#">Política de Privacidade</a> (LGPD).</p>
          </div>
          <div className="cookie-actions">
            <button className="btn-cookie-config">Configurar</button>
            <button className="btn-cookie-accept" onClick={acceptCookies}>Aceitar todos</button>
          </div>
        </div>
      </div>
    </>
  );
}
