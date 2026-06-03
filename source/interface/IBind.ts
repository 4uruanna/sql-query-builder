/**
 * @todo
 */
export default interface IBind<T> {
  /**
   * Returns the next bindable index
   * e.g.
   * ```ts
   * builder
   *  .where(`t.name = ${builder.bind("value")}`)
   *  .build();
   * ```
   */
  setParameter(value: unknown, name?: string | number): T;
}
