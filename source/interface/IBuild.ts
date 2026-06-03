import type IQuery from "./IQuery.ts";

/**
 * @todo
 */
export default interface IBuild {
  /**
   * Return raw query
   */
  build(): IQuery;
}
