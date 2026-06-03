import { faker } from "@faker-js/faker";
import { assertStringIncludes } from "@std/assert/string-includes";
import { PgQueryBuilder } from "../../source/pg/PgQueryBuilder.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("PgSqlInsertQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;

  await group.step("build", () => {
    const result = new PgQueryBuilder()
      .insert()
      .into(tableName)
      .build();

    assertStringIncludes(
      result.query,
      `INSERT INTO ${tableName} (*)\r\nVALUES ()`,
    );
  });

  await group.step("with columns", () => {
    const columns = [
      faker.word.adjective(),
      faker.word.adjective(),
      faker.word.adjective(),
    ];

    const result = new PgQueryBuilder()
      .insert()
      .into(tableName)
      .columns(...columns)
      .build();

    assertStringIncludes(result.query, `(${columns.join(", ")})`);
  });

  await group.step("with row values", () => {
    const row = [
      faker.word.adjective(),
      faker.word.adjective(),
      faker.word.adjective(),
    ];

    const result = new PgQueryBuilder()
      .insert()
      .into(tableName)
      .values(...row)
      .build();

    assertStringIncludes(result.query, `($1, $2, $3)`);

    assertEquals(result.parameters[0].value, row[0]);
    assertEquals(result.parameters[1].value, row[1]);
    assertEquals(result.parameters[2].value, row[2]);
  });
});
