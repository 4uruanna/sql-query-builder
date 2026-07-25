import type { ISelectQueryBuilder } from "../interface/ISelectQueryBuilder.ts";
import type { IDeleteQueryBuilder } from "../interface/IDeleteQueryBuilder.ts";
import type { IInsertQueryBuilder } from "../interface/IInsertQueryBuilder.ts";
import type { IUpdateQueryBuilder } from "../interface/IUpdateQueryBuilder.ts";

/**
 * Abstract base class for SQL query builders.
 * Provides factory methods for creating specific query builder types.
 */
export abstract class SqlQueryBuilder {
  /**
   * Creates a DELETE query builder.
   * @returns A new DELETE query builder instance
   */
  public abstract delete(): IDeleteQueryBuilder;

  /**
   * Creates an INSERT query builder.
   * @returns A new INSERT query builder instance
   */
  public abstract insert(): IInsertQueryBuilder;

  /**
   * Creates a SELECT query builder.
   * @returns A new SELECT query builder instance
   */
  public abstract select(): ISelectQueryBuilder;

  /**
   * Creates an UPDATE query builder.
   * @returns A new UPDATE query builder instance
   */
  public abstract update(): IUpdateQueryBuilder;
}
