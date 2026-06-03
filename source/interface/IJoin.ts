import type { Join } from "../enumerator/Join.ts";

/**
 * @todo
 */
export default interface IJoin<T> {
  /**
   * @todo
   */
  join(
    type: Join,
    leftColumn: string,
    rightTable: string,
    rightColumn: string,
  ): T;
}
