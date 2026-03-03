# Arquitetura técnica — Baba App

## 1) Entidades

### User
Coleção: `users/{userId}`

```ts
{
  id: string;                 // firebase uid
  name: string;
  avatarUrl?: string;
  email: string;
  locale: 'pt-BR' | 'en';
  timezone: 'America/Sao_Paulo';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Family
Coleção: `families/{familyId}`

```ts
{
  id: string;
  name: string;
  ownerUserId: string;
  subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'incomplete';
  subscriptionId?: string;    // stripe subscription id
  customerId?: string;        // stripe customer id
  active: boolean;            // false quando bloqueada
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### FamilyMember
Subcoleção: `families/{familyId}/members/{userId}`

```ts
{
  userId: string;
  role: 'owner' | 'member' | 'babysitter';
  email: string;
  displayName: string;
  status: 'active' | 'removed';
  invitedByUserId?: string;
  joinedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Invite
Coleção: `invites/{inviteId}`

```ts
{
  inviteId: string;
  familyId: string;
  email: string;
  role: 'member' | 'babysitter';
  status: 'pending' | 'accepted' | 'revoked';
  invitedByUserId: string;
  acceptedByUserId?: string;
  acceptedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

> Convite sem expiração temporal; revogação manual em settings.

### Child
Subcoleção: `families/{familyId}/children/{childId}`

```ts
{
  childId: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  notes?: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### ActivityType
Subcoleção: `families/{familyId}/activityTypes/{typeId}`

```ts
{
  typeId: string;
  title: string; // ex: brincar, ler, checkin, checkout
  kind: 'standard' | 'checkin' | 'checkout';
  enabled: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### ActivityLog
Subcoleção: `families/{familyId}/logs/{logId}`

```ts
{
  logId: string;
  familyId: string;
  childId?: string;
  activityTypeId: string;
  activityKind: 'standard' | 'checkin' | 'checkout';
  titleSnapshot: string;
  observations?: string;
  occurredAt: Timestamp;      // quando ocorreu
  dayKey: string;             // YYYY-MM-DD em America/Sao_Paulo
  createdByUserId: string;
  createdByRole: 'owner' | 'member' | 'babysitter';
  status: 'completed';
  createdAt: Timestamp;
}
```

### AttendanceDaily
Subcoleção: `families/{familyId}/attendance/{yyyymmdd_userId}`

```ts
{
  id: string; // ${dayKey}_${userId}
  dayKey: string;
  userId: string;             // babysitter
  checkinLogId?: string;
  checkoutLogId?: string;
  isClosed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

> Garante 1 par check-in/check-out por dia por babysitter.

### SubscriptionEvent
Subcoleção: `families/{familyId}/subscriptionEvents/{eventId}`

```ts
{
  eventId: string;
  stripeEventId: string;
  type: string;
  subscriptionId?: string;
  statusAfter: 'active' | 'past_due' | 'canceled' | 'incomplete';
  payload: object;
  createdAt: Timestamp;
}
```

## 2) Regras de acesso (RBAC)

- Requisito global: usuário autenticado.
- Requisito família: usuário deve estar `members.status=active`.
- Se `family.subscriptionStatus !== 'active'`: bloquear acesso às rotas da família (HTTP 402/403 + tela bloqueada).

Permissões:

- `owner`
  - Tudo na família.
  - Gerencia assinatura, membros, convites, crianças, tipos de atividade.
- `member`
  - Vê timeline e histórico.
  - Cria logs.
  - Gerencia crianças/tipos de atividade/convites (sem mudar owner).
- `babysitter`
  - Vê timeline e histórico.
  - Cria logs (incluindo check-in/out).
  - Não apaga logs.
  - Não acessa settings/billing.

## 3) API (Route Handlers)

Base: `/api`

### Famílias
- `POST /families`
  - Cria família **após** confirmação de checkout/assinatura.
- `GET /families`
  - Lista famílias do usuário.
- `GET /families/:familyId`
  - Dados resumidos da família + role atual.

### Membros e convites
- `POST /invites`
  - Cria convite (`member` ou `babysitter`).
- `POST /invites/:inviteId/accept`
  - Aceita convite com email do usuário logado.
- `DELETE /families/:familyId/members/:userId`
  - Remove membro (soft remove).

### Crianças
- `GET /families/:familyId/children`
- `POST /families/:familyId/children`
- `PATCH /families/:familyId/children/:childId`

### Tipos de atividade
- `GET /families/:familyId/activity-types`
- `POST /families/:familyId/activity-types`
- `PATCH /families/:familyId/activity-types/:typeId`

### Logs
- `GET /families/:familyId/logs?day=YYYY-MM-DD`
  - Retorna logs do dia (timezone SP).
  - Se `day` ausente/inválido, backend assume o dia atual em `America/Sao_Paulo`.
  - A tela de timeline usa `day` na URL como fonte de verdade para permitir deep-link e refresh.
- `POST /families/:familyId/logs`
  - Cria log comum ou de check-in/out.
  - Se `activityKind=checkin/checkout`, atualiza `attendance` numa transação.

### Ponto
- `GET /families/:familyId/attendance?day=YYYY-MM-DD&userId=...`

### Billing
- `POST /billing/create-checkout-session`
  - Cria sessão Stripe Checkout (mensal).
- `POST /billing/webhook`
  - Processa `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated/deleted`.

## 3) Arquitetura da API: Ports and Adapters (desacoplamento de rotas e use cases)

### Diretriz
As rotas HTTP (`route.ts`) **não** devem conter regra de negócio nem acesso direto a banco. Elas atuam como adaptadores de entrada (HTTP adapters):
1. Validam entrada/saída.
2. Montam contexto (usuário autenticado, família ativa, locale/timezone).
3. Chamam um **use case** via porta.
4. Traduzem resultado/erros para HTTP status e payload.

### Camadas propostas

```txt
src/
  modules/
    <dominio>/
      application/
        use-cases/
      domain/
        entities/
        services/
      ports/
        repositories/
        gateways/
      adapters/
        http/           # mapeamento request/response (opcional)
        persistence/
          in-memory/
          firestore/
```

### Portas principais (exemplo)
- `FamilyRepositoryPort`
- `InviteRepositoryPort`
- `ActivityLogRepositoryPort`
- `AttendanceRepositoryPort`
- `SubscriptionRepositoryPort`

### Exemplo de fluxo
`POST /api/families/:familyId/logs`:
- Route handler recebe payload.
- Chama `CreateActivityLogUseCase`.
- Use case depende de `ActivityLogRepositoryPort` e `AttendanceRepositoryPort`.
- Adapter in-memory (hoje) implementa as portas.
- Adapter Firestore (futuro) substitui implementação sem quebrar use case/rota.

## 4) Camada de repositório (abstração de dados)

### Decisão
Como o banco ainda não está conectado, os dados permanecem em memória, mas **atrás de interfaces de repositório** para troca fácil por Firestore.

### Estratégia de implementação incremental
1. Criar interfaces de repositório em `modules/*/ports/repositories`.
2. Migrar handlers para chamar use cases.
3. Injetar implementação in-memory (composition root simples).
4. Criar adapters Firestore com a mesma assinatura.
5. Trocar injeção por ambiente (`MEMORY`/`FIRESTORE`) sem alterar regras de negócio.

### Benefícios imediatos
- Isolamento da regra de negócio.
- Menor acoplamento com framework/banco.
- Testes unitários rápidos com doubles/fakes.
- Migração controlada para Firestore.

## 5) Fluxos críticos

### 4.1 Onboarding do owner
1. Login Firebase.
2. Clica “Criar família”.
3. Backend cria `checkoutSession` Stripe.
4. Pagamento aprovado.
5. Webhook marca assinatura `active`.
6. Família é criada/ativada e owner adicionado em `members`.

### 4.2 Convite
1. Owner/member cria convite por email.
2. Usuário convidado faz login.
3. Aceita convite; backend valida email e vínculo.
4. Registro em `members` com role correspondente.

### 4.3 Registro diário
1. Usuário seleciona família no header.
2. Timeline abre no dia atual.
3. Navegação por dia (setas esquerda/direita).
4. FAB abre lista de tipos de atividade.
5. Criação do log (`observations` opcional).
6. Para check-in/out, valida regra 1 par/dia/babysitter.

## 6) UI/UX (mobile-first)

- Header compacto:
  - Seletor de família.
  - Avatar/menu.
- Timeline do dia:
  - Data com navegação horizontal por botões.
  - Lista cronológica de logs.
- FAB inferior direito:
  - Bottom sheet com tipos de atividade ativos.
- Settings (somente owner/member):
  - Crianças.
  - Tipos de atividade.
  - Membros e convites.
- Billing:
  - Status da assinatura, botão para atualizar pagamento.

## 7) Índices Firestore sugeridos

- `families/{familyId}/logs` por `dayKey ASC, occurredAt DESC`
- `invites` por `email ASC, status ASC, createdAt DESC`
- `families` via members (consultar por `members/{userId}`)
- `attendance` por `dayKey ASC, userId ASC`

## 8) Estratégia de teste

- Unit:
  - validação RBAC
  - validação check-in/out (1 par diário)
- Integração (route handlers):
  - convites
  - criação de log
  - bloqueio por assinatura
- E2E (Playwright):
  - login -> seleção família -> criar log -> navegar dias

## 9) MVP por fases

### Fase 1
- Auth + famílias + membros + convites + timeline básica.

### Fase 2
- Crianças + tipos de atividade configuráveis + check-in/out robusto.

### Fase 3
- Stripe completo + bloqueio por status + tela billing.

### Fase 4
- i18n PT-BR/EN + refinamento UX minimalista.


## 11) Decisões de UX implementadas

- Header interno: o seletor de família (esquerda) segue o mesmo padrão de interação do menu de perfil (direita), com trigger em superfície, dropdown e ações em lista.
- Timeline diária: a data atual da visão fica na query string (`?day=YYYY-MM-DD`), e a navegação anterior/próximo altera essa URL para disparar nova consulta de logs.
- Componentes-chave do fluxo:
  - `src/components/family-switcher.tsx` (seleção de família + atalho para settings da família ativa)
  - `src/components/day-navigator.tsx` (navegação anterior/próximo com links por dia)
  - `src/components/activity-list.tsx` (consulta da API de logs por família/dia)
  - `src/app/(app)/family/[familyId]/page.tsx` (orquestra família + dia da URL)
  - `src/app/api/families/[familyId]/logs/route.ts` (contrato de leitura e fallback de `day`)
