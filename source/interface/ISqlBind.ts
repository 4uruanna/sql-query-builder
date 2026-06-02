/**
 * @todo
 */
export default interface ISqlBind<T> {
  /**
   * @todo
   */
  get values(): unknown[];

  /**
   * Returns the next bindable index
   * e.g.
   * ```ts
   * builder
   *  .where(`t.name = ${builder.bind("value")}`)
   *  .build();
   * ```
   */
  bind(value: unknown): string;
}
