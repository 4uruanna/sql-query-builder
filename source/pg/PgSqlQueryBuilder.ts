import type SqlDeleteQueryBuilder from "../abstract/SqlDeleteQueryBuilder.ts";
import type SqlInsertQueryBuilder from "../abstract/SqlInsertQueryBuilder.ts";
import SqlQueryBuilder from "../abstract/SqlQueryBuilder.ts";
import type SqlSelectQueryBuilder from "../abstract/SqlSelectQueryBuilder.ts";
import type SqlUpdateQueryBuilder from "../abstract/SqlUpdateQueryBuilder.ts";
import PgSqlDeleteQueryBuilder from "./PgSqlDeleteQueryBuilder.ts";
import PgSqlInsertQueryBuilder from "./PgSqlInsertQueryBuilder.ts";
import PgSqlSelectQueryBuilder from "./PgSqlSelectQueryBuilder.ts";
import PgSqlUpdateQueryBuilder from "./PgSqlUpdateQueryBuilder.ts";

/**
 * @todo
 */
export default class PgSqlQueryBuilder extends SqlQueryBuilder {
  /**
   * @todo
   */
  public override select(table: string): SqlSelectQueryBuilder {
    return new PgSqlSelectQueryBuilder(table);
  }

  /**
   * @todo
   */
  public override update(table: string): SqlUpdateQueryBuilder {
    return new PgSqlUpdateQueryBuilder(table);
  }

  /**
   * @todo
   */
  public override delete(table: string): SqlDeleteQueryBuilder {
    return new PgSqlDeleteQueryBuilder(table);
  }

  /**
   * @todo
   */
  public override insert(table: string): SqlInsertQueryBuilder {
    return new PgSqlInsertQueryBuilder(table);
  }
}
