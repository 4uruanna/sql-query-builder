import type { IDeleteQueryBuilder } from "../interface/IDeleteQueryBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";
import { PgBuilder } from "./PgBuilder.ts";

/**
 * @todo
 */
export class PgDeleteQueryBuilder extends PgBuilder
  implements IDeleteQueryBuilder {
  /**
   * @todo
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
