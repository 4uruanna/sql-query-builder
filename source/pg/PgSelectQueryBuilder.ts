import type { ISelectQueryBuilder } from "../interface/ISelectQueryBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";
import { PgBuilder } from "./PgBuilder.ts";
import {
  type QueryOrder,
  QueryOrderEnumerator,
} from "../enumerator/QueryOrder.ts";

/**
 * @todo
 */
export class PgSelectQueryBuilder extends PgBuilder
  implements ISelectQueryBuilder {
  /**
   * @todo
   */
  private readonly _orderArray: string[] = [];

  /**
   * @todo
   */
  private _limit: number | undefined = undefined;

  /**
   * @todo
   */
  private _offset: number | undefined = undefined;

  /**
   * @todo
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
   * @todo
   */
  protected get queryOrderBy(): string {
    let orderBy = "";

    if (this._orderArray.length) {
      orderBy = `\r\nORDER BY ${this._orderArray.join(", ")}`;
    }

    return orderBy;
  }

  /**
   * @todo
   * @param limit
   */
  public limit(limit: number): this {
    this._limit = limit;
    return this;
  }

  /**
   * @todo
   * @param offset
   */
  public offset(offset: number): this {
    this._offset = offset;
    return this;
  }

  /**
   * @todo
   */
  public orderBy(column: string, order: QueryOrder): ISelectQueryBuilder {
    this._orderArray.push(`${column} ${QueryOrderEnumerator[order]}`);
    return this;
  }

  /**
   * @todo
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
