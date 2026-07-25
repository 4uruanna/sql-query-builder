import type { ISelectQueryBuilder } from "../interface/ISelectQueryBuilder.ts";
import type { IDeleteQueryBuilder } from "../interface/IDeleteQueryBuilder.ts";
import type { IInsertQueryBuilder } from "../interface/IInsertQueryBuilder.ts";
import type { IUpdateQueryBuilder } from "../interface/IUpdateQueryBuilder.ts";
import { PgDeleteQueryBuilder } from "./PgDeleteQueryBuilder.ts";
import { PgInsertQueryBuilder } from "./PgInsertQueryBuilder.ts";
import { PgSelectQueryBuilder } from "./PgSelectQueryBuilder.ts";
import { PgUpdateQueryBuilder } from "./PgUpdateQueryBuilder.ts";
import { SqlQueryBuilder } from "../abstract/SqlQueryBuilder.ts";

/**
 * PostgreSQL query builder factory.
 * Creates PostgreSQL-specific query builders for different query types.
 */
export class PgQueryBuilder extends SqlQueryBuilder {
  /**
   * Creates a PostgreSQL SELECT query builder.
   * @returns A new PgSelectQueryBuilder instance
   */
  public override select(): ISelectQueryBuilder {
    return new PgSelectQueryBuilder();
  }

  /**
   * Creates a PostgreSQL UPDATE query builder.
   * @returns A new PgUpdateQueryBuilder instance
   */
  public override update(): IUpdateQueryBuilder {
    return new PgUpdateQueryBuilder();
  }

  /**
   * Creates a PostgreSQL DELETE query builder.
   * @returns A new PgDeleteQueryBuilder instance
   */
  public override delete(): IDeleteQueryBuilder {
    return new PgDeleteQueryBuilder();
  }

  /**
   * Creates a PostgreSQL INSERT query builder.
   * @returns A new PgInsertQueryBuilder instance
   */
  public override insert(): IInsertQueryBuilder {
    return new PgInsertQueryBuilder();
  }
}
