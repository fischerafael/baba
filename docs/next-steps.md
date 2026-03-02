# Pós-merge: e agora?

Este documento transforma a arquitetura em execução prática, com foco em entregar MVP rápido e sem retrabalho.

## Objetivo imediato

Subir a primeira versão utilizável com:
- login,
- criação/seleção de família,
- convites,
- timeline diária,
- check-in/check-out,
- bloqueio por assinatura.

## Sprint 0 (1-2 dias): foundation

### 1) Bootstrap do projeto
- Criar app Next.js com TypeScript e App Router.
- Adicionar Firebase client/admin, Stripe SDK e zod.
- Configurar lint/format e aliases de import.

**Definition of Done**
- `npm run lint` e `npm run build` passando localmente.
- Ambiente com `.env.example` pronto.

### 2) Setup de autenticação
- Firebase Auth com email provider.
- Sessão server-side via cookie/token verificado no backend.
- Middleware para proteger `/app`.

**Definition of Done**
- Usuário loga e chega em área autenticada.
- APIs privadas rejeitam usuário sem token válido.

## Sprint 1 (3-4 dias): famílias + membros + convites

### 3) Famílias
- Endpoint `GET /api/families`.
- Tela com seletor de família no header.
- Estado de família ativa (cookie/localStorage + server sync).

### 4) Convites e papéis
- Criar convite por email (`member` e `babysitter`).
- Aceitar convite no login.
- Remoção de membro (status `removed`).

**Definition of Done**
- Mesmo usuário em múltiplas famílias.
- Usuário removido perde acesso imediatamente ao workspace.

## Sprint 2 (3-4 dias): timeline + atividades + ponto

### 5) Timeline por dia
- Navegação de data (esquerda/direita).
- Query por `dayKey` em timezone SP.
- FAB com bottom-sheet de tipos de atividade.

### 6) Check-in/check-out
- Validação transacional para 1 par por dia por babysitter.
- Logs comuns + observações opcionais.
- Babysitter cria e visualiza; não apaga.

**Definition of Done**
- Bloqueio de segundo check-in no mesmo dia para mesma babysitter.
- Histórico navegável por dia funcionando.

## Sprint 3 (2-3 dias): billing Stripe

### 7) Assinatura mensal
- `POST /api/billing/create-checkout-session`.
- Webhook Stripe para manter status da assinatura.
- Bloqueio de acesso quando status != `active`.

**Definition of Done**
- Assinatura ativa libera acesso.
- `past_due` / `canceled` bloqueia workspace da família.

## Sprint 4 (2 dias): acabamento

### 8) i18n e UX final
- PT-BR e EN.
- Ajustes de UI minimalista mobile-first.
- Estados vazios e mensagens didáticas.

**Definition of Done**
- Fluxo principal completo no mobile sem atrito.

---

## Ordem técnica recomendada (sem retrabalho)

1. Infra (auth/session/rbac)
2. Family membership
3. Timeline/logs
4. Attendance (check-in/out)
5. Billing
6. i18n/UI polish

---

## Checklist de ambiente

- Firebase projeto criado.
- Firestore em modo production com regras mínimas.
- Stripe produto/preço mensal criado.
- URLs de webhook configuradas.
- Variáveis:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_APP_URL`

---

## Riscos e mitigação

- **Timezone incorreto em virada de dia**
  - Mitigar com `dayKey` calculado sempre em `America/Sao_Paulo` no backend.
- **Permissão inconsistente por role**
  - Centralizar RBAC em helper único reutilizado por todos handlers.
- **Eventos duplicados de webhook**
  - Persistir `stripeEventId` e tornar processamento idempotente.

---

## Primeiras 5 tasks (copiar para o tracker)

1. Scaffold do app Next.js + libs base.
2. Implementar auth/session middleware server-side.
3. Implementar `GET /api/families` + header com family switcher.
4. Implementar `POST /api/invites` e `POST /api/invites/:id/accept`.
5. Implementar timeline com query por dia e FAB para criar log.
