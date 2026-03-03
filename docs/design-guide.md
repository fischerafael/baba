# Design Guide - Baba App

## Stack de UI
- Classes utilitárias no padrão Tailwind usadas em todo layout.
- Estrutura de componentes no padrão shadcn/ui (`components.json`, `src/components/ui/*`, `src/lib/utils.ts`).
- Fallback local de utilitários em `src/app/globals.css` para garantir renderização consistente em ambiente sem acesso externo.

## Paleta (OpenAI-like)
- Primary: `#10A37F`
- Secondary: `#0F1729`
- Accent: `#7DD3FC`
- Background: `#0B0F17`
- Surface: `#111827`
- Surface 2: `#182235`
- Border: `#24324A`
- Text muted: `#9CA3AF`

## Estrutura de telas
### Landing
- Header
- Hero
- Benefícios
- Features
- Footer

### Internas
- Header padrão com family switcher (esquerda) e user menu (direita)
- Área útil para conteúdo principal

## Componentes reutilizáveis
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/user-menu.tsx`

## Observação de ambiente
O ambiente bloqueia instalação de novos pacotes no npm (403), por isso a renderização visual não depende de CDN: as classes utilizadas possuem fallback local em `globals.css`, mantendo o app estável e com aparência consistente.
