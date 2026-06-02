# @jackofblades/sql-query-builder

## Example

### CRUD PG

```ts
import PgSqlQueryBuilder from "./PgSqlQueryBuilder";
import PgSqlSelectQueryBuilder from "./PgSqlSelectQueryBuilder";
import PgSqlDeleteQueryBuilder from "./PgSqlDeleteQueryBuilder";

const pgBuilder = new PgSqlQueryBuilder();

// Insert
// ....................

const insert = pgBuilder.insert("table");

const insertQuery = insert.columns("foo", "bar", "baz")
    .rows(["fooVal", "barVal", "bazVal"])
    .build();

const insertValues = insert.values; // Contains all values

// Select
// ....................

const selectBuilder: PgSqlSelectQueryBuilder = pgBuilder.select("table ta");

const bind = "hello";

const selectQuery = selectBuilder
    .columns("ta.foo", "ta.bar", "ta.baz")
    .where(`ta.foo = ${selectBuilder.bind(bind)}`)
    .and(`ta.bar = TRUE`)
    .or(`ta.foo IS NULL`)
    .build() // Building Where
    .join("INNER", 'ta.id', "another tb", "tb.id")
    .build() // Building Select

const selectValues = selectBuilder.values; // Contains all values

// Update
// ....................

const updateBuilder = pgBuilder.update("table ta");

const updateQuery = updateBuilder.where(`ta.foo = ${selectBuilder.bind(bind)}`)
    .and(`ta.bar = TRUE`)
    .or(`ta.foo IS NULL`)
    .build() // Building Where
    .join("INNER", 'ta.id', "another tb", "tb.id")
    .set(`ta.foo = ${updateBuilder.bind(bind)}`)
    .build() // Building Select

const updateValues = selectBuilder.values; // Contains all values

// Delete
// ....................

const deleteBuilder: PgSqlDeleteQueryBuilder = pgBuilder.delete("table ta");

const deleteQuery = deleteBuilder.where(`ta.foo = ${selectBuilder.bind(bind)}`)
    .build() // Building Where
    .build(); // Building Delete

const deleteValues = selectBuilder.values; // Contains all values
```
