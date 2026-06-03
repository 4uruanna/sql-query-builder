import type { IBuild } from "./IBuild.ts";
import type { IWhere } from "./IWhere.ts";
import type { IBind } from "./IBind.ts";
import type { IJoin } from "./IJoin.ts";

/**
 * @todo
 */
export interface IDeleteQueryBuilder
  extends
    IBuild,
    IWhere<IDeleteQueryBuilder>,
    IJoin<IDeleteQueryBuilder>,
    IBind<IDeleteQueryBuilder> {
  /**
   * @todo
   * @param table
   */
  from(table: string): IDeleteQueryBuilder;
}
