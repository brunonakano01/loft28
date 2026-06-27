# Loft 28 — Design Brainstorm

<response>
<probability>0.07</probability>
<text>
**Ideia 1: Brutalismo Quente / Warm Brutalism**

**Design Movement:** Brutalismo editorial com calor orgânico — inspirado em revistas de arquitetura dos anos 70-80 como Domus e Abitare.

**Core Principles:**
1. Tipografia grande e assertiva como elemento estrutural da página
2. Contraste entre peso tipográfico pesado e espaço vazio generoso
3. Fotos tratadas com leve grain/vinheta para textura analógica
4. Numeração de seções visível como elemento decorativo

**Color Philosophy:** Fundo creme envelhecido (#F5F0E8), texto em marrom escuro quase preto (#1C1410), detalhes em terracota queimada (#B5522A). A paleta evoca papéis velhos, tijolos expostos e madeira envelhecida — exatamente o que o loft representa.

**Layout Paradigm:** Assimétrico com texto e imagem em tensão. Seções alternadas: texto à esquerda / imagem à direita, depois imagem full-bleed, depois texto centralizado com imagem menor. Nunca dois layouts iguais consecutivos.

**Signature Elements:**
1. Números de seção grandes (01, 02, 03...) em tipografia display, semi-transparentes
2. Linha fina horizontal como divisor de seções
3. Legendas em itálico abaixo das fotos

**Interaction Philosophy:** Scroll suave com fade-in lateral das seções. Cursor customizado em forma de ponto. Hover nas fotos revela legenda com slide-up.

**Animation:** Entrada das seções com translateX(30px) + opacity 0→1 em 0.6s ease-out. Parallax leve (0.3x) nas imagens hero.

**Typography System:**
- Display: Playfair Display (serif pesado para títulos e números)
- Body: DM Sans (sans-serif limpo para descrições)
- Accent: Playfair Display Italic para legendas
</text>
</response>

<response>
<probability>0.08</probability>
<text>
**Ideia 2: Japandi Editorial / Wabi-Sabi Refinado**

**Design Movement:** Japandi — fusão do minimalismo japonês com o funcionalismo escandinavo, aplicado a um contexto editorial de arquitetura.

**Core Principles:**
1. Silêncio visual — muito espaço branco como elemento ativo
2. Fotos em proporção cuidadosamente escolhida (3:2 e 1:1 alternados)
3. Texto esparso, apenas o essencial
4. Textura sutil no fundo (papel de arroz digital)

**Color Philosophy:** Branco quase puro (#FAFAF8), cinza quente (#8B8480), marrom amadeirado (#6B4F3A), e um único acento em verde musgo (#4A5240). Paleta que respira e descansa os olhos.

**Layout Paradigm:** Grid de 12 colunas com fotos que "quebram" o grid intencionalmente. Texto sempre em colunas estreitas (máx. 45 caracteres por linha). Seções com muito padding vertical.

**Signature Elements:**
1. Linha vertical fina à esquerda do texto como marcador de seção
2. Fotos com borda branca tipo polaroid em algumas seções
3. Ícones minimalistas de planta baixa como separadores

**Interaction Philosophy:** Scroll lento com reveal gradual. Sem animações agressivas. Tudo acontece de forma quase imperceptível.

**Animation:** Fade-in puro (opacity 0→1) em 1s ease. Sem movimento lateral ou vertical. Imagens com zoom muito sutil (scale 1.02→1.0) ao entrar.

**Typography System:**
- Display: Cormorant Garamond Light (elegante, quase frágil)
- Body: Work Sans Regular (neutro, legível)
- Accent: Cormorant Garamond Italic para citações
</text>
</response>

<response>
<probability>0.09</probability>
<text>
**Ideia 3: Editorial Cinematográfico / Dark Warmth**

**Design Movement:** Fotografia editorial de interiores estilo Kinfolk/Monocle — escuro, quente, cinematográfico.

**Core Principles:**
1. Fundo escuro que faz as fotos "brilharem" como janelas iluminadas
2. Tipografia em ouro/cobre como único acento de cor
3. Fotos em full-bleed com overlay de gradiente sutil
4. Navegação lateral fixa como âncora visual

**Color Philosophy:** Fundo quase preto com tom marrom (#1A1410), texto em creme (#F0EBE0), detalhes em ouro envelhecido (#C9A96E). A escuridão do fundo faz as fotos quentes do loft parecerem ainda mais acolhedoras — como ver luz dentro de uma casa à noite.

**Layout Paradigm:** Seções em full-viewport com fotos como background, texto sobreposto com glassmorphism sutil. Galeria de fotos em grid assimétrico (1 grande + 2 pequenas).

**Signature Elements:**
1. Linha horizontal em ouro separando título do corpo do texto
2. Navegação lateral com pontos indicadores de seção
3. Número da seção em fonte display grande, cor ouro, no canto superior

**Interaction Philosophy:** Scroll snapping suave entre seções. Cursor com trail sutil. Hover nas fotos com zoom e saturação aumentada.

**Animation:** Seções com curtain reveal (clip-path de baixo para cima). Texto com stagger de palavras. Parallax nas fotos de fundo (0.5x).

**Typography System:**
- Display: Libre Baskerville (serif clássico com personalidade)
- Body: Lato Light (leve, elegante)
- Accent: Libre Baskerville Italic em ouro para citações e legendas
</text>
</response>

## Escolha Final: Ideia 3 — Editorial Cinematográfico / Dark Warmth

Fundo escuro que valoriza as fotos quentes do loft, tipografia em ouro, layout cinematográfico com seções em full-viewport.
