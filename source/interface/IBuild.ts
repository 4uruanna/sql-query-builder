import type { IQuery } from "./IQuery.ts";

/**
 * @todo
 */
export interface IBuild {
  /**
   * Return raw query
   */
  build(): IQuery;
}
