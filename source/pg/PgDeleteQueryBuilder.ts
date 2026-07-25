import type { IDeleteQueryBuilder } from "../interface/IDeleteQueryBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";
import { PgBuilder } from "./PgBuilder.ts";

/**
 * PostgreSQL DELETE query builder.
 * Builds DELETE queries with support for WHERE and JOIN clauses.
 */
export class PgDeleteQueryBuilder extends PgBuilder
  implements IDeleteQueryBuilder {
  /**
   * Builds the final DELETE query.
   * @returns The query object containing the SQL string and parameters
   */
  public build(): IQuery {
    return {
      parameters: this.parameters,
      query: `DELETE FROM ${this.table}` +
        this.joins +
        this.queryWhere,
    };
  }
}
