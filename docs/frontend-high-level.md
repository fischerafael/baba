# Documentação de alto nível (Front-end)

Este documento resume, em nível executivo/técnico, como o front-end atual da aplicação está organizado.

## Visão geral

O projeto é um **front-end em Next.js (App Router)** com foco **mobile-first** para o fluxo de famílias e babás.
Hoje, várias integrações (auth real, banco real e billing real) ainda estão em modo mock/protótipo.

## Objetivo do front-end atual

- Entregar um fluxo navegável de produto para validação de UX.
- Simular os principais cenários de uso:
  - login;
  - seleção/troca de família;
  - timeline diária de atividades;
  - área de configurações por família.
- Preparar a base para conectar serviços reais (Firebase/Firestore/Stripe) sem reescrever a UI.

## Stack e padrões

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilo/UI:** Tailwind CSS + componentes utilitários
- **Arquitetura de rotas:**
  - Segmentos `(auth)` e `(app)` para separar área pública e autenticada
  - Route Handlers em `/api/*` para BFF/mock do front-end

## Estrutura de navegação (alto nível)

- `/` → landing/entrada
- `/login` → autenticação (mock)
- `/app` → redireciona para contexto da família ativa
- `/family/[familyId]` → timeline diária de atividades
- `/family/[familyId]/settings` → configurações da família (conforme perfil)

## Componentes de UI relevantes

- **Family Switcher:** troca de workspace/família
- **Day Navigator:** muda o dia da timeline (query param `day`)
- **Activity List:** renderiza atividades do dia
- **User Menu/Login Actions:** ações de sessão e perfil

## Camada de dados no estado atual

Atualmente, o front-end consome APIs internas do Next.js com dados mockados:

- `GET /api/families`
- `GET/POST /api/families/[familyId]/logs`
- `POST /api/invites`
- `POST /api/invites/[inviteId]/accept`
- `POST /api/auth/session` (sessão mock)

Isso permite evoluir interface e fluxos antes da conexão com backend definitivo.

## Segurança e acesso (estado atual)

- Middleware valida presença de cookie de sessão mock (`baba_session`) para proteger área autenticada.
- Regras de autorização por papel (owner/member/babysitter) já têm base no projeto, mas ainda em fase de evolução para integração completa.

## Limitações atuais

- Autenticação Firebase real ainda não conectada.
- Persistência real (Firestore) ainda não conectada.
- Billing/assinatura (Stripe) ainda não conectado ponta a ponta.
- Parte do comportamento de domínio está simulada para acelerar validação de produto.

## Próxima evolução recomendada

1. Conectar auth real (Firebase ID token + sessão server-side).
2. Substituir repositórios mock por Firestore.
3. Conectar billing com Stripe (checkout + webhook + bloqueio por status).
4. Consolidar observabilidade e testes E2E dos fluxos principais.

---

Se o objetivo for manter este arquivo sempre enxuto, ele pode continuar como **single source de visão macro**;
os detalhes técnicos completos permanecem em `README.md` e `docs/architecture.md`.
