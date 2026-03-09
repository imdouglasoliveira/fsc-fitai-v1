# Template de Prompt para Criar uma Rota de API

Crie a rota `POST /workout-plan/:workoutPlanId/days/:workoutPlanDayId/sessions`

## Descrição

Inicia uma sessão de treino de um dia de um plano de treino específico. Um dia iniciado representa uma `WorkoutSession` criada no banco de dados.

## Requisitos Técnicos

- Use case deve se chamar `StartWorkoutSession`.
- Criar em `src/usecases/StartWorkoutSession.ts`.
- Rota registrada no plugin de rotas existente em `src/routes/workout-plans.ts`.
- Response schema criado em `src/schemas/index.ts` como `StartWorkoutSessionResponseSchema`.

## Autenticação

- Rota protegida com `auth.api.getSession()`.
- Retorna `401` se o usuário não estiver autenticado.

## Request

```ts
interface Params {
  workoutPlanId: string; // UUID do plano de treino
  workoutPlanDayId: string; // UUID do dia do plano
}
```

```ts
interface Body {} // Sem body — a ação é apenas "iniciar"
```

```ts
interface Query {} // Sem query params
```

## Response

### 201 Created

```ts
interface StatusCode201 {
  userWorkoutSessionId: string; // UUID da sessão criada
}
```

### Erros

| Status | Condição | Código |
|--------|----------|--------|
| 401 | Usuário não autenticado | `UNAUTHORIZED` |
| 403 | Usuário não é dono do workout plan | `FORBIDDEN_ERROR` |
| 404 | Workout plan não encontrado | `NOT_FOUND_ERROR` |
| 404 | Workout day não encontrado ou não pertence ao plan | `NOT_FOUND_ERROR` |
| 409 | Dia já possui uma sessão em andamento (`completedAt` é `null`) | `CONFLICT_ERROR` |
| 500 | Erro interno | `INTERNAL_SERVER_ERROR` |

## Regras de Negócio

1. **Validar existência do plano**: O `workoutPlanId` deve existir no banco. Caso contrário, retorne `404`.
2. **Validar propriedade**: Apenas o dono do workout plan (`userId` do plano === `userId` da sessão autenticada) pode iniciar a sessão. Caso contrário, retorne `403`.
3. **Validar existência do dia**: O `workoutPlanDayId` deve existir e pertencer ao `workoutPlanId` informado. Caso contrário, retorne `404`.
4. **Sessão única ativa por dia**: Se o dia já possuir uma `WorkoutSession` com `completedAt = null` (sessão em andamento), retorne `409`.
5. **Criação da sessão**: Criar um registro `WorkoutSession` vinculado ao `workoutDayId`. O campo `startedAt` é preenchido automaticamente (`@default(now())`).
