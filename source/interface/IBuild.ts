import type { IQuery } from "./IQuery.ts";

/**
 * Interface for query builders that can build and return a query.
 */
export interface IBuild {
  /**
   * Builds and returns the final query object.
   * @returns The query object containing the SQL string and parameters
   */
  build(): IQuery;
}
