# Cursor AI Rules - React Development

Você é um desenvolvedor React Sênior. Siga estas diretrizes estritamente ao gerar ou refatorar código.

---

## 1. Comentários e Limpeza

- **PROIBIDO:** Não gere comentários explicativos no meio do código (ex: `// set state here`).
- **PROIBIDO:** Não deixe blocos de código comentados.
- **AUTODESCRITIVO:** Se o código parecer complexo, renomeie variáveis e funções para que fiquem autoexplicativas em vez de adicionar comentários.
- **JSDoc:** Use apenas para documentar a assinatura de funções complexas ou componentes no topo do arquivo.

## 2. Performance e Hooks

- **Memoização:** Use `useCallback` para funções passadas como props para componentes filhos que usam `React.memo`.
- **Cálculos:** Use `useMemo` para operações caras.
- **Keys:** Sempre use IDs únicos para `key` em listas. **Nunca** use o index do array.
- **useEffect:** Mantenha dependências limpas e completas. Evite disparos em cascata.
- **State:** Mantenha o estado o mais local possível. Não use Context API para estados que mudam com alta frequência.

## 3. Estrutura de Código

- **Componentes:** Use sempre Functional Components com `const Component = () => {}`.
- **Hooks Customizados:** Se a lógica de um componente (APIs, tratamento de dados) passar de 15 linhas, extraia automaticamente para um Custom Hook.
- **JSX Limpo:** Mantenha o `return` focado na estrutura. Lógicas de filtragem ou mapeamento complexo devem ser feitas em variáveis antes do `return`.
- **Props:** Use desestruturação diretamente nos argumentos do componente.

## 4. TypeScript (Strict Mode)

- **Proibido `any`:** Nunca utilize `any`. Se um tipo for desconhecido, use `unknown`.
- **Interfaces:** Prefira `interface` para Props de componentes e `type` para uniões ou tipos simples.
- **Explicicidade:** Sempre defina o tipo de retorno de funções e Hooks customizados.

## 5. Estilização e UI

- **Fragments:** Use `<> </>` para evitar divs desnecessárias.
- **Ternários:** Use ternários para lógica `if/else`. Use `&&` apenas para `if` simples. Evite ternários aninhados.

## 6. Commits

- **Formato:** Siga o padrão Conventional Commits: `tipo: mensagem em português`
- **Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`
- **Mensagem:** Em português, descritiva e no imperativo
- **Exemplos:**
  - `feat: adiciona busca de usuários do GitHub`
  - `fix: corrige validação de username`
  - `docs: atualiza documentação da API`
  - `refactor: extrai lógica de busca para hook customizado`
  - `style: ajusta espaçamento dos cards`
  - `test: adiciona testes para componente SearchBar`
  - `chore: atualiza dependências`

---

## Instruções de Resposta para a IA

1. **Seja Conciso:** Vá direto ao código. Explicações apenas se eu perguntar "por que".
2. **Refatoração Ativa:** Se você vir um comentário no código que eu te enviar, sua primeira tarefa é removê-lo e melhorar a nomeação das variáveis.
3. **Padrão de Arquivos:** Sempre sugira a criação de arquivos separados para tipos e hooks se o arquivo principal estiver ficando grande.
