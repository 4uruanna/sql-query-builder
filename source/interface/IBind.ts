/**
 * Interface for query builders that support parameter binding.
 */
export interface IBind<T> {
  /**
   * Sets a parameter value for the query.
   * @param value - The parameter value
   * @param name - Optional parameter name or position identifier
   * @returns The builder instance for method chaining
   *
   * @example
   * ```ts
   * builder
   *  .where(`t.name = $1`)
   *  .setParameter("value")
   *  .build();
   * ```
   */
  setParameter(value: unknown, name?: string | number): T;
}
