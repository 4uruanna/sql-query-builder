import { faker } from "@faker-js/faker";
import { PgQueryBuilder } from "../../source/pg/PgQueryBuilder.ts";
import { assertStringIncludes } from "@std/assert/string-includes";
import { assertEquals } from "@std/assert/equals";

Deno.test("PgSqlUpdateQueryBuilder tests", async (group) => {
  const tableName = `${faker.string.nanoid(7)}`;

  await group.step("build", () => {
    const result = new PgQueryBuilder()
      .update()
      .from(tableName)
      .build();

    assertStringIncludes(result.query, `UPDATE ${tableName}`);
  });

  await group.step("with where clauses", () => {
    const parameters = [
      faker.number.int(),
      faker.number.int(),
      faker.number.int(),
    ];

    const result = new PgQueryBuilder()
      .update()
      .from(tableName)
      .setParameter(parameters[0])
      .setParameter(parameters[1])
      .setParameter(parameters[2])
      .where(`tn.column_a = $1`)
      .and(`tn.column_b = $2`)
      .or(`tn.column_c = $3`)
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

  await group.step("with setters", () => {
    const parameters = [
      faker.number.int(),
      faker.number.int(),
      faker.number.int(),
    ];

    const result = new PgQueryBuilder()
      .update()
      .from(tableName)
      .set("tn.foo", parameters[0])
      .set("tn.bar", parameters[1])
      .set("tn.baz", parameters[2])
      .build();

    assertStringIncludes(result.query, `tn.foo = $256,`);
    assertStringIncludes(result.query, `tn.bar = $257,`);
    assertStringIncludes(result.query, `tn.baz = $258`);
  });
});
