import type { ISelectQueryBuilder } from "../interface/ISelectQueryBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";
import { PgBuilder } from "./PgBuilder.ts";
import {
  type QueryOrder,
  QueryOrderEnumerator,
} from "../enumerator/QueryOrder.ts";

/**
 * PostgreSQL SELECT query builder.
 * Builds SELECT queries with support for WHERE, JOIN, ORDER BY, LIMIT, and OFFSET.
 */
export class PgSelectQueryBuilder extends PgBuilder
  implements ISelectQueryBuilder {
  /** Array of ORDER BY clauses */
  private readonly _orderArray: string[] = [];

  /** The LIMIT value for pagination */
  private _limit: number | undefined = undefined;

  /** The OFFSET value for pagination */
  private _offset: number | undefined = undefined;

  /**
   * Builds the LIMIT and OFFSET clause string.
   * @returns The LIMIT/OFFSET clause string
   */
  protected get queryPaging(): string {
    let paging = "";

    if (this._limit !== undefined) {
      paging = paging.concat(`\r\nLIMIT ${this._limit}`);
    }

    if (this._offset !== undefined) {
      paging = paging.concat(`\r\nOFFSET ${this._offset}`);
    }

    return paging;
  }

  /**
   * Builds the ORDER BY clause string.
   * @returns The ORDER BY clause string
   */
  protected get queryOrderBy(): string {
    let orderBy = "";

    if (this._orderArray.length) {
      orderBy = `\r\nORDER BY ${this._orderArray.join(", ")}`;
    }

    return orderBy;
  }

  /**
   * Sets the maximum number of rows to return.
   * @param limit - The maximum number of rows
   * @returns The builder instance for method chaining
   */
  public limit(limit: number): this {
    this._limit = limit;
    return this;
  }

  /**
   * Sets the number of rows to skip.
   * @param offset - The number of rows to skip
   * @returns The builder instance for method chaining
   */
  public offset(offset: number): this {
    this._offset = offset;
    return this;
  }

  /**
   * Adds an ORDER BY clause to the query.
   * @param column - The column to order by
   * @param order - The sort direction (ASC or DESC)
   * @returns The builder instance for method chaining
   */
  public orderBy(column: string, order: QueryOrder): ISelectQueryBuilder {
    this._orderArray.push(`${column} ${QueryOrderEnumerator[order]}`);
    return this;
  }

  /**
   * Builds the final SELECT query.
   * @returns The query object containing the SQL string and parameters
   */
  public build(): IQuery {
    return {
      parameters: this.parameters,
      query: `SELECT ${this.queryColumns}` +
        `\r\nFROM ${this.table}` +
        this.joins +
        this.queryWhere +
        this.queryOrderBy +
        this.queryPaging,
    };
  }
}
