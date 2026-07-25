import type { IBuild } from "./IBuild.ts";
import type { IWhere } from "./IWhere.ts";
import type { IBind } from "./IBind.ts";
import type { IJoin } from "./IJoin.ts";

/**
 * Interface for DELETE query builders.
 */
export interface IDeleteQueryBuilder
  extends
    IBuild,
    IWhere<IDeleteQueryBuilder>,
    IJoin<IDeleteQueryBuilder>,
    IBind<IDeleteQueryBuilder> {
  /**
   * Sets the table to delete from.
   * @param table - The table name
   * @returns The builder instance for method chaining
   */
  from(table: string): IDeleteQueryBuilder;
}
