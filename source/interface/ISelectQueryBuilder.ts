import type IBuild from "./IBuild.ts";
import type IWhere from "./IWhere.ts";
import type IJoin from "./IJoin.ts";
import type IBind from "./IBind.ts";
import type { QueryOrder } from "../enumerator/QueryOrder.ts";

/**
 * @todo
 */
export default interface ISelectQueryBuilder
  extends
    IBuild,
    IWhere<ISelectQueryBuilder>,
    IJoin<ISelectQueryBuilder>,
    IBind<ISelectQueryBuilder> {
  /**
   * @todo
   * @param table
   */
  from(table: string): ISelectQueryBuilder;

  /**
   * @todo
   * @param columns
   */
  columns(...columns: string[]): ISelectQueryBuilder;

  /**
   * @todo
   * @param limit
   */
  limit(limit: number): ISelectQueryBuilder;

  /**
   * @todo
   * @param offset
   */
  offset(offset: number): ISelectQueryBuilder;

  /**
   * @todo
   * @param column
   * @param order
   */
  orderBy(column: string, order: QueryOrder): ISelectQueryBuilder;
}
