import { faker } from "@faker-js/faker";
import { assertStringIncludes } from "@std/assert/string-includes";
import PgSqlQueryBuilder from "../../source/pg/PgSqlQueryBuilder.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("PgSqlSelectQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;
  const pgBuilder = new PgSqlQueryBuilder();
  const builder = pgBuilder.select(tableName);

  await group.step("build", () => {
    const query = builder.build();
    assertStringIncludes(query, `SELECT * FROM ${tableName}`);
  });

  await group.step("with selectors", () => {
    const columns = [
      faker.word.adjective(),
      faker.word.adjective(),
      faker.word.adjective(),
    ];

    const query = builder
      .columns(...columns)
      .build();

    assertStringIncludes(query, `SELECT ${columns.join(", ")}`);
  });

  await group.step("with where clauses", () => {
    const numberArray = [
      faker.number.int(),
      faker.number.int(),
      faker.number.int()
    ];

    const query = builder
        .where(`tn.column_a = ${builder.bind(numberArray[0])}`)
        .and(`tn.column_b = ${builder.bind(numberArray[1])}`)
        .or(`tn.column_c = ${builder.bind(numberArray[2])}`)
        .build()
        .build();

    assertStringIncludes(query, `WHERE tn.column_a = $1`);
    assertStringIncludes(query, `AND tn.column_b = $2`);
    assertStringIncludes(query, `OR tn.column_c = $3`);

    assertEquals(builder.values[0], numberArray[0]);
    assertEquals(builder.values[1], numberArray[1]);
    assertEquals(builder.values[2], numberArray[2]);
  });

  await group.step("with joins", () => {
    const tableNameFoo = `${faker.string.nanoid(7)} f`;
    const tableNameBar = `${faker.string.nanoid(7)} b`;
    const query = builder
      .join("INNER", "tn.id", tableNameFoo, "f.id")
      .join("LEFT", "tn.name", tableNameBar, "b.name")
      .build();

    assertStringIncludes(query, `INNER JOIN ${tableNameFoo} ON tn.id = f.id`);
    assertStringIncludes(
      query,
      `LEFT JOIN ${tableNameBar} ON tn.name = b.name`,
    );
  });

  await group.step("with limit and/or offset", () => {
    let query = builder.limit(1).build();
    assertStringIncludes(query, `LIMIT 1`);

    query = builder.offset(666).build();
    assertStringIncludes(query, `OFFSET 666`);
  });

  await group.step("with orders", () => {
    const query = builder.orderBy("name", "ASC").build();
    assertStringIncludes(query, `ORDER BY name ASC`);
  });
});
