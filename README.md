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

## Próximos passos (MVP)

1. Bootstrap Next.js + Firebase Admin e client SDK.
2. Implementar sessão server-side via Firebase ID Token.
3. CRUD de família + membros + convites.
4. Timeline diária + FAB de novo log.
5. Check-in/check-out com validação de 1 par por dia.
6. Integração Stripe Checkout + webhook.
7. Bloqueio de acesso por status de assinatura.
8. i18n PT-BR/EN e UI final mobile-first.
