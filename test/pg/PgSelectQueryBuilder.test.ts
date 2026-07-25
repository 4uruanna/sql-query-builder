import { faker } from "@faker-js/faker";
import { assertStringIncludes } from "@std/assert/string-includes";
import { PgQueryBuilder } from "../../source/pg/PgQueryBuilder.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("PgSqlSelectQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;
  const tableNameB = `${faker.string.nanoid(7)}`;

  await group.step("build", () => {
    const result = new PgQueryBuilder()
      .select()
      .from(tableName)
      .build();

    assertStringIncludes(result.query, `SELECT *`);
    assertStringIncludes(result.query, `FROM ${tableName}`);
  });

  await group.step("with columns", () => {
    const columns = [
      faker.word.adjective(),
      faker.word.adjective(),
      faker.word.adjective(),
    ];

    const result = new PgQueryBuilder()
      .select()
      .from(tableName)
      .columns(...columns)
      .build();

    assertStringIncludes(result.query, `SELECT ${columns.join(", ")}`);
  });

  await group.step("with where clauses", () => {
    const parameters = [
      faker.number.int(),
      faker.number.int(),
      faker.number.int(),
    ];

    const subquery = new PgQueryBuilder()
      .select()
      .from(tableNameB + " b")
      .columns("b.id")
      .where("b.id = $4")
      .setParameter(1)
      .build();

    const result = new PgQueryBuilder()
      .select()
      .setParameter(parameters[0])
      .setParameter(parameters[1])
      .setParameter(parameters[2])
      .from(tableName)
      .where("tn.column_a = $1")
      .and("tn.column_b = $2")
      .or("tn.column_c = $3")
      .and(`tn.column_d IN (${subquery.query})`)
      .setParameter(subquery.parameters[0])
      .build();

    assertStringIncludes(
      result.query,
      `WHERE tn.column_a = $1 AND tn.column_b = $2`,
    );
    assertStringIncludes(
      result.query,
      `OR tn.column_c = $3 AND tn.column_d IN (`,
    );

    assertEquals(result.parameters[0].value, parameters[0]);
    assertEquals(result.parameters[1].value, parameters[1]);
    assertEquals(result.parameters[2].value, parameters[2]);
  });

  await group.step("with joins", () => {
    const tableNameFoo = `${faker.string.nanoid(7)} f`;
    const tableNameBar = `${faker.string.nanoid(7)} b`;

    const result = new PgQueryBuilder()
      .select()
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

  await group.step("with limit", () => {
    const limit = faker.number.int();

    const result = new PgQueryBuilder()
      .select()
      .from(tableName)
      .limit(limit)
      .build();

    assertStringIncludes(result.query, `LIMIT ${limit}`);
  });

  await group.step("with offset", () => {
    const offset = faker.number.int();

    const result = new PgQueryBuilder()
      .select()
      .from(tableName)
      .offset(offset)
      .build();

    assertStringIncludes(result.query, `OFFSET ${offset}`);
  });

  await group.step("with orders", () => {
    const result = new PgQueryBuilder()
      .select()
      .from(tableName)
      .orderBy("name", "ASC")
      .orderBy("age", "DESC")
      .build();

    assertStringIncludes(result.query, `ORDER BY name ASC`);
    assertStringIncludes(result.query, `age DESC`);
  });
});
