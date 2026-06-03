import { faker } from "@faker-js/faker";
import { assertStringIncludes } from "@std/assert/string-includes";
import { PgQueryBuilder } from "../../source/pg/PgQueryBuilder.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("PgSqlDeleteQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;

  await group.step("build", () => {
    const result = new PgQueryBuilder()
      .delete()
      .from(tableName)
      .build();

    assertStringIncludes(result.query, `DELETE FROM ${tableName}`);
  });

  await group.step("with where clauses and parameters", () => {
    const parameters = [
      faker.number.int(),
      faker.number.int(),
      faker.number.int(),
    ];

    const result = new PgQueryBuilder()
      .delete()
      .setParameter(parameters[0])
      .setParameter(parameters[1])
      .setParameter(parameters[2])
      .from(tableName)
      .where("tn.column_a = $1")
      .and("tn.column_b = $2")
      .or("tn.column_c = $3")
      .build();

    assertStringIncludes(
      result.query,
      `WHERE tn.column_a = $1 AND tn.column_b = $2`,
    );
    assertStringIncludes(result.query, `OR tn.column_c = $3`);

    assertEquals(result.parameters[0].value, parameters[0]);
    assertEquals(result.parameters[1].value, parameters[1]);
    assertEquals(result.parameters[2].value, parameters[2]);
  });

  await group.step("with joins", () => {
    const tableNameFoo = `${faker.string.nanoid(7)} f`;
    const tableNameBar = `${faker.string.nanoid(7)} b`;

    const result = new PgQueryBuilder()
      .delete()
      .from(tableName)
      .join("INNER", "tn.id", tableNameFoo, "f.id")
      .join("LEFT", "tn.name", tableNameBar, "b.name")
      .build();

    assertStringIncludes(
      result.query,
      `INNER JOIN ${tableNameFoo} ON tn.id = f.id`,
    );

    assertStringIncludes(
      result.query,
      `LEFT JOIN ${tableNameBar} ON tn.name = b.name`,
    );
  });
});
