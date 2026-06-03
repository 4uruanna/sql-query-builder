import type { IBuild } from "./IBuild.ts";
import type { IWhere } from "./IWhere.ts";
import type { IJoin } from "./IJoin.ts";
import type { IBind } from "./IBind.ts";

export interface IUpdateQueryBuilder
  extends
    IBuild,
    IWhere<IUpdateQueryBuilder>,
    IJoin<IUpdateQueryBuilder>,
    IBind<IUpdateQueryBuilder> {
  from(table: string): IUpdateQueryBuilder;

  /**
   * @todo
   * @param column
   * @param value
   */
  set(column: string, value: unknown): IUpdateQueryBuilder;
}
