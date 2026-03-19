# Baba App (MVP)

Aplicativo mobile-first para gestão de famílias e babás, com autenticação Firebase (SSO por email), workspace por família, atividades diárias e assinatura Stripe.

## Decisões confirmadas

- Login: Firebase Auth com SSO por email.
- Roles: `owner`, `member`, `babysitter`.
- Convites sem expiração automática; revogação feita pela família.
- Babysitter pode ver histórico completo e criar logs, mas não apaga logs.
- Navegação de dias na tela de atividades com botões anterior/próximo.
- Check-in/check-out: 1 par por dia por babysitter.
- Settings visível para `owner` e `member`; `babysitter` não vê.
- Assinatura: 1 plano mensal por família (Stripe).
- Se assinatura atrasar/cancelar: bloqueia acesso à família.
- Multi-família permitida para qualquer usuário.
- Idiomas: PT-BR e EN.
- Timezone padrão: `America/Sao_Paulo`.

## Stack

- Next.js (App Router, Route Handlers)
- TypeScript
- Firebase Auth + Firestore
- Stripe (Checkout + Webhooks)
- UI minimalista mobile-first

## Estrutura sugerida

```txt
src/
  app/
    (auth)/
      login/page.tsx
    (app)/
      layout.tsx
      page.tsx                 # redirect para família ativa
      family/[familyId]/
        page.tsx               # timeline diária
        settings/page.tsx      # crianças, atividades, membros (owner/member)
        billing/page.tsx       # assinatura da família
    api/
      auth/session/route.ts
      families/route.ts
      families/[familyId]/route.ts
      families/[familyId]/members/route.ts
      families/[familyId]/children/route.ts
      families/[familyId]/activity-types/route.ts
      families/[familyId]/logs/route.ts
      families/[familyId]/attendance/route.ts
      invites/route.ts
      invites/[inviteId]/accept/route.ts
      billing/create-checkout-session/route.ts
      billing/webhook/route.ts
  lib/
    firebase-admin.ts
    auth.ts
    i18n.ts
    rbac.ts
    timezone.ts
    stripe.ts
  modules/
    families/
    activities/
    billing/
    invites/
  types/
    domain.ts
```

## Domínio (Firestore)

Detalhes completos em `docs/architecture.md`.

## Status atual de implementação

> **Importante:** este repositório ainda está em fase de construção. A seção de arquitetura descreve o alvo de MVP; o status real de entrega está nesta seção.

### Implementado
- Base Next.js 14 + TypeScript + App Router.
- UI inicial mobile-first (login, layout da área autenticada, família, settings).
- Header interno com family switcher em dropdown, no mesmo padrão visual/comportamental do menu de perfil.
- `GET /api/families` com dados mockados.
- `GET/POST /api/families/[familyId]/logs` com persistência in-memory e filtro por `?day=YYYY-MM-DD`.
- `POST /api/invites` e endpoint de aceite `POST /api/invites/[inviteId]/accept` (mock).

### Parcial (mock/protótipo)
- Autenticação/sessão: cookie de sessão mockado via `/api/auth/session`.
- Middleware de proteção: implementado com sessão mock (`baba_session`).
- Timeline/FAB: navegação por dia via URL (`?day=YYYY-MM-DD`) e listagem consumindo a API de logs por dia.

### Não implementado ainda
- Firebase Auth real (ID token + validação server-side).
- Firestore conectado com repositórios concretos.
- Billing Stripe (checkout + webhook + bloqueio por assinatura).
- Attendance transacional (1 par check-in/out por dia por babysitter).
- i18n real PT-BR/EN.

## Checklist macro (base para próximos steps)

- [x] Fundamentos do app (scaffold + UI base).
- [ ] Auth real com Firebase (atual: mock).
- [x] API básica de famílias.
- [ ] Convites ponta-a-ponta com persistência real (atual: parcial/mock).
- [ ] Timeline ponta-a-ponta com criação por UI + dados reais (navegação diária e leitura por API já implementadas).
- [ ] Attendance robusto (regra 1 par/dia).
- [ ] Billing Stripe.
- [ ] Bloqueio por assinatura em toda a camada de acesso.
- [ ] i18n PT-BR/EN final.


## Próximos passos (MVP)

1. Bootstrap Next.js + Firebase Admin e client SDK.
2. Implementar sessão server-side via Firebase ID Token.
3. CRUD de família + membros + convites.
4. Timeline diária + FAB de novo log.
5. Check-in/check-out com validação de 1 par por dia.
6. Integração Stripe Checkout + webhook.
7. Bloqueio de acesso por status de assinatura.
8. i18n PT-BR/EN e UI final mobile-first.

## Guias novos

- `docs/nextjs-use-client-guide.md`: troubleshooting e boas práticas para `"use client"` no App Router.
- `skills/nextjs-use-client/`: skill focada em corrigir erros de boundary Server/Client.
- `skills/nextjs-best-practices/`: skill de arquitetura e padrões gerais de Next.js.
- `docs/frontend-high-level.md`: visão de alto nível do front-end atual (escopo, estrutura e limitações).

## Execução pós-merge

Plano de implementação detalhado em `docs/next-steps.md`.
