import type SqlDeleteQueryBuilder from "./SqlDeleteQueryBuilder.ts";
import type SqlInsertQueryBuilder from "./SqlInsertQueryBuilder.ts";
import type SqlSelectQueryBuilder from "./SqlSelectQueryBuilder.ts";
import type SqlUpdateQueryBuilder from "./SqlUpdateQueryBuilder.ts";

/**
 * Main sql builder
 */
export default abstract class SqlQueryBuilder {
  /**
   * Return delete builder
   */
  public abstract delete(table: string): SqlDeleteQueryBuilder;

  /**
   * Return insert builder
   */
  public abstract insert(table: string): SqlInsertQueryBuilder;

  /**
   * Return select builder
   */
  public abstract select(table: string): SqlSelectQueryBuilder;

  /**
   * Return update builder
   */
  public abstract update(table: string): SqlUpdateQueryBuilder;
}
