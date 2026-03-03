# App Router práticas recomendadas

## Rendering

- Server Components como padrão.
- Client Components somente quando houver interatividade necessária.
- Separar ilhas interativas para reduzir JS no cliente.

## Data

- Buscar dados no servidor por padrão.
- Validar entradas em APIs com esquemas.
- Não expor segredos no cliente.

## Routing

- Usar layouts para estrutura compartilhada.
- Usar Route Handlers para integrações externas e escrita de dados.
- Padronizar tratamento de erros e respostas HTTP.

## Qualidade

- Rodar lint, typecheck e build antes de merge.
- Documentar decisões arquiteturais e trade-offs.
- Criar checklists de revisão com foco em boundary server/client.
