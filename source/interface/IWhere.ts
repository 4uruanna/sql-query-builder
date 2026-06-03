/**
 * @todo
 */
export default interface IWhere<T> {
  /**
   * Defines a condition
   * @param condition
   */
  where(condition: string): T;

  /**
   * @todo
   */
  and(condition: string): T;

  /**
   * @todo
   */
  or(condition: string): T;
}
