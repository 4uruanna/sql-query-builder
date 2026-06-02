import { faker } from "@faker-js/faker";
import PgSqlQueryBuilder from "../../source/pg/PgSqlQueryBuilder.ts";
import { assertStringIncludes } from "@std/assert/string-includes";
import { assertEquals } from "@std/assert/equals";

Deno.test("PgSqlUpdateQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;
  const pgBuilder = new PgSqlQueryBuilder();
  const builder = pgBuilder.update(tableName);

  await group.step("build", () => {
    const query = builder.build();
    assertStringIncludes(query, `UPDATE ${tableName}`);
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



  await group.step("with setters", () => {
    const numberArray = [
      faker.number.int(),
      faker.number.int(),
      faker.number.int()
    ];

    const query = builder.set("tn.foo", numberArray[0])
        .set("tn.bar", numberArray[1])
        .set("tn.baz", numberArray[2])
        .build();

    assertStringIncludes(query, `tn.foo = $4,`);
    assertStringIncludes(query, `tn.bar = $5,`);
    assertStringIncludes(query, `tn.baz = $6`);
  });
});
