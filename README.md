# devluisam.github.io

Portfólio de Luis Henrique Azevedo — site estático publicado no GitHub Pages.
Sem framework e sem dependências em produção: HTML gerado, um CSS e um JS.

## Cadastrar um projeto novo

1. Coloque as capturas em `assets-src/projetos/<slug>/` (PNG ou JPG).
   O prefixo numérico define a ordem; a primeira é a capa do card.
   Nomeie a captura de celular com `mobile` e marque `device: 'mobile'` nos dados.
2. `npm run images` — gera os `.webp` (e a imagem de compartilhamento `og.jpg`) em `img/projetos/<slug>/`.
3. Adicione o projeto em [`data/projects.mjs`](data/projects.mjs) (o topo do arquivo explica cada campo).
4. `npm run build` — gera a galeria da home, a página `/projetos/<slug>/` e o sitemap.
5. `npm run check` — confere links, imagens, âncoras e acessibilidade básica.
6. `npm run serve` e abra http://localhost:4300 para conferir.

`npm install` é necessário uma vez (só por causa do `sharp`, usado no passo 2).
`assets-src/` fica fora do git: as capturas originais não vão para o site.

## Onde editar

| O quê | Arquivo |
|---|---|
| Projetos (textos, categoria, links, imagens, destaque) | `data/projects.mjs` |
| Contatos, WhatsApp e mensagem pronta, redes, SEO | `data/site.mjs` |
| Textos fixos da home (hero, serviços, processo, sobre) e layout das páginas | `scripts/templates.mjs` |
| Visual | `assets/css/site.css` (tokens no topo) |
| Interações e animações | `assets/js/site.js` |

Não edite `index.html`, `projetos/`, `404.html`, `sitemap.xml` nem `robots.txt` à mão:
eles são gerados pelo `npm run build` e sobrescritos a cada build.

## Comandos

```bash
npm run images   # otimiza as capturas de assets-src/
npm run build    # gera o site
npm run check    # verifica o HTML gerado (adicione -- --external para testar links externos)
npm run serve    # servidor local em http://localhost:4300
```

## Decisões

- **Conteúdo nasce no HTML.** A galeria e as páginas são pré-geradas: funcionam sem JavaScript e
  são indexáveis. O JS só adiciona filtros, animações e o menu mobile.
- **Movimento com propósito.** Revelação do título em CSS (não espera o JS), revelação ao rolar
  apenas abaixo da dobra, botões magnéticos só com mouse, filtros com animação de reorganização
  (FLIP) e transição entre páginas pela View Transitions API. Tudo desligado com
  `prefers-reduced-motion`.
- **Fontes no próprio site** (`assets/fonts/`, licença OFL) com pré-carregamento e fontes
  substitutas com métricas calibradas: o layout não pula quando a fonte chega.
- **Filtros na URL:** `/?segmento=restaurantes` abre a galeria já filtrada — útil para mandar a um
  cliente só os projetos do segmento dele.
