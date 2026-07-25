# @jackofblades/sql-query-builder

Lightweight sql query builder library for Deno with zero non-standard dependency.

## Example

### CRUD PG

```ts
import { PgQueryBuilder } from "@4uruanna/sql-query-builder";

// Insert
// ....................

let output = new PgQueryBuilder()
  .insert()
  .into("table")
  .columns("foo", "bar", "baz")
  .values("foo_val", "bar_val", "baz_val")
  .build();

/**
 * output:
 * {
 *  query: "INSERT INTO usYTcRB (foo, bar, baz) VALUES ($1, $2, $3)",
 *  parameters: [
 *    { id: 1, value: "foo_val" },
 *    { id: 2, value: "bar_val" },
 *    { id: 3, value: "baz_val" }
 *  ]
 * }
 */

// Select
// ....................

output = new PgQueryBuilder()
  .select()
  .setParameter("alice")
  .setParameter(18)
  .from("table t")
  .columns("t.name", "c.name")
  .join("INNER", "t.id", "cats c", "c.owner")
  .where("t.name = $1")
  .or("c.age > $2")
  .orderBy("t.name", "ASC")
  .orderBy("c.name", "DESC")
  .limit(10)
  .offset(0)
  .build();

/**
 * output:
 * {
 *  query: "SELECT t.name, c.name FROM table t INNER ...",
 *  parameters: [
 *    { id: 1, value: "alice" },
 *    { id: 2, value: "18" }
 *  ]
 * }
 */
```
