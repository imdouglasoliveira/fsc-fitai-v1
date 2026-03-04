import { describe, expect, it } from "vitest";

/**
 * Testes e2e serão expandidos quando Fastify estiver configurado.
 * Padrão: importar app, injetar request, validar response.
 *
 * Exemplo futuro:
 *   const app = buildApp()
 *   const response = await app.inject({ method: 'GET', url: '/' })
 *   expect(response.statusCode).toBe(200)
 */
describe("e2e: health check", () => {
  it("placeholder - servidor ainda não configurado", () => {
    // Será substituído quando o Fastify estiver integrado
    expect(true).toBe(true);
  });
});
