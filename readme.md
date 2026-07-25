# @4uruanna/sql-query-builder

Lightweight SQL query builder library for Deno and TypeScript with zero non-standard dependencies.

## Features

- **Type-safe query building** - Full TypeScript support with interfaces for all query types
- **PostgreSQL support** - PostgreSQL-specific query builder with parameter binding
- **Fluent API** - Chainable methods for building complex queries
- **Zero dependencies** - No external dependencies required
- **Parameter binding** - Automatic parameter management with positional and named parameters

## Installation

```ts
import { PgQueryBuilder } from "@4uruanna/sql-query-builder";
```

## Usage

### Basic SELECT Query

```ts
import { PgQueryBuilder } from "@4uruanna/sql-query-builder";

const query = new PgQueryBuilder()
  .select()
  .from("users")
  .columns("id", "name", "email")
  .where("age > $1")
  .setParameter(18)
  .orderBy("name", "ASC")
  .limit(10)
  .build();

// Result:
// {
//   query: "SELECT id, name, email FROM users\r\nWHERE age > $1\r\nORDER BY name ASC\r\nLIMIT 10",
//   parameters: [{ id: 1, value: 18 }]
// }
```

### SELECT with JOIN

```ts
const query = new PgQueryBuilder()
  .select()
  .setParameter("alice")
  .setParameter(18)
  .from("users u")
  .columns("u.name", "p.title")
  .join("INNER", "u.id", "posts p", "p.author_id")
  .where("u.name = $1")
  .or("u.age > $2")
  .orderBy("u.name", "ASC")
  .orderBy("p.title", "DESC")
  .limit(10)
  .offset(0)
  .build();

// Result:
// {
//   query: "SELECT u.name, p.title FROM users u\r\nINNER JOIN posts p ON u.id = p.author_id\r\nWHERE u.name = $1\r\n   OR u.age > $2\r\nORDER BY u.name ASC, p.title DESC\r\nLIMIT 10\r\nOFFSET 0",
//   parameters: [
//     { id: 1, value: "alice" },
//     { id: 2, value: 18 }
//   ]
// }
```

### INSERT Query

```ts
const query = new PgQueryBuilder()
  .insert()
  .into("users")
  .columns("name", "email", "age")
  .values("Alice", "alice@example.com", 30)
  .returning("id")
  .build();

// Result:
// {
//   query: "INSERT INTO users (name, email, age)\r\nVALUES ($1, $2, $3)\r\nRETURNING id",
//   parameters: [
//     { id: 1, value: "Alice" },
//     { id: 2, value: "alice@example.com" },
//     { id: 3, value: 30 }
//   ]
// }
```

### UPDATE Query

```ts
const query = new PgQueryBuilder()
  .update()
  .from("users")
  .set("name", "Alice Updated")
  .set("email", "alice.updated@example.com")
  .where("id = $1")
  .setParameter(1)
  .build();

// Result:
// {
//   query: "UPDATE users\r\nSET\n\r   name = $1,\n\r   email = $2\r\nWHERE id = $3",
//   parameters: [
//     { id: 1, value: "Alice Updated" },
//     { id: 2, value: "alice.updated@example.com" },
//     { id: 3, value: 1 }
//   ]
// }
```

### DELETE Query

```ts
const query = new PgQueryBuilder()
  .delete()
  .from("users")
  .where("id = $1")
  .setParameter(1)
  .build();

// Result:
// {
//   query: "DELETE FROM users\r\nWHERE id = $1",
//   parameters: [{ id: 1, value: 1 }]
// }
```

### Complex WHERE Conditions

```ts
const query = new PgQueryBuilder()
  .select()
  .from("users")
  .columns("*")
  .where("status = $1")
  .and("age > $2")
  .or("role = $3")
  .and("department = $4")
  .setParameter("active")
  .setParameter(18)
  .setParameter("admin")
  .setParameter("engineering")
  .build();

// Result:
// {
//   query: "SELECT * FROM users\r\nWHERE status = $1 AND age > $2\r\n   OR role = $3 AND department = $4",
//   parameters: [
//     { id: 1, value: "active" },
//     { id: 2, value: 18 },
//     { id: 3, value: "admin" },
//     { id: 4, value: "engineering" }
//   ]
// }
```

## Query Result

All `build()` methods return an `IQuery` object:

```ts
interface IQuery {
  query: string; // The SQL query string
  parameters: { id: string | number; value: unknown }[]; // Array of parameters
}
```

## License

MIT License - See [license](license) file for details.
