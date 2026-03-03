# Next.js `use client`: guia prático

Este guia explica quando usar `"use client"`, como evitar o erro de handlers em Server Components e quais decisões tomar em aplicações App Router.

## Regra principal

No App Router do Next.js, arquivos em `app/` são **Server Components por padrão**. Só adicione `"use client"` quando precisar de recursos de navegador/interatividade, como:

- `onClick`, `onChange`, `onSubmit` e demais event handlers
- `useState`, `useEffect`, `useReducer`, `useRef`
- `window`, `document`, `localStorage`, APIs web
- hooks client-side do Next (`useRouter`, `usePathname`, `useSearchParams`)

## Como interpretar o erro

Erro comum:

> Event handlers cannot be passed to Client Component props...

Isso geralmente indica que você colocou event handlers dentro de um componente tratado como Server Component.

### Correções possíveis

1. Marcar o componente como cliente (`"use client"`) quando ele realmente precisa de interatividade.
2. Extrair apenas a parte interativa para um componente cliente menor.
3. Manter o restante da árvore como Server Component para performance e segurança.

## Estratégia recomendada

1. Começar com Server Components por padrão.
2. Criar “ilhas” de interatividade com componentes cliente pequenos.
3. Passar dados serializáveis de Server -> Client.
4. Evitar enviar funções do servidor para props client-side.

## Boas práticas extras no App Router

- Buscar dados no servidor sempre que possível.
- Usar Route Handlers (`app/api`) para integrações backend.
- Evitar colocar lógica sensível em componentes cliente.
- Preferir `router.push`/`<Link />` em vez de manipular URL manualmente.
- Limitar o escopo de `"use client"` para reduzir bundle JS.

## Checklist rápido

- O componente usa evento/hook/browser API? -> precisa de `"use client"`.
- Dá para isolar a parte interativa em um componente menor? -> extraia.
- Está passando apenas props serializáveis para o cliente? -> valide.
- O componente roda sem acesso a `window` no servidor? -> confirme.
