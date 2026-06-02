import { faker } from "@faker-js/faker";
import { assertStringIncludes } from "@std/assert/string-includes";
import PgSqlQueryBuilder from "../../source/pg/PgSqlQueryBuilder.ts";
import { assertEquals } from "@std/assert/equals"

Deno.test("PgSqlInsertQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;
  const pgBuilder = new PgSqlQueryBuilder();
  const builder = pgBuilder.insert(tableName);

  await group.step("build", () => {
    const query = builder.build();
    assertStringIncludes(query, `INSERT INTO ${tableName}`);
  });

  await group.step("with columns", () => {
    const columns = [
      faker.word.adjective(),
      faker.word.adjective(),
      faker.word.adjective(),
    ];

    const query = builder
      .columns(...columns)
      .build();
    assertStringIncludes(query, `(${columns.join(", ")})`);
  });

  await group.step("with values", () => {
    const rows = [
      [
        faker.word.adjective(),
        faker.word.adjective(),
        faker.word.adjective(),
      ],
      [
        faker.word.adjective(),
        faker.word.adjective(),
        faker.word.adjective(),
      ],
    ];

    const query = builder
      .rows(...rows)
      .build();
    assertStringIncludes(query, `($1,$2,$3),`);
    assertStringIncludes(query, `($4,$5,$6)`);

    assertEquals(builder.values[0], rows[0][0]);
    assertEquals(builder.values[1], rows[0][1]);
    assertEquals(builder.values[2], rows[0][2]);

    assertEquals(builder.values[3], rows[1][0]);
    assertEquals(builder.values[4], rows[1][1]);
    assertEquals(builder.values[5], rows[1][2]);
  });
});
