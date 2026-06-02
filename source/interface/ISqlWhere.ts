import type ISqlWhereBuilder from "./ISqlWhereBuilder.ts";

/**
 * @todo
 */
export default interface ISqlWhere<T> {
  /**
   * Defines a condition
   * @param condition
   */
  where(condition: string): ISqlWhereBuilder<this>;

  /**
   * @todo
   */
  setWhere(clause: string): void;
}
