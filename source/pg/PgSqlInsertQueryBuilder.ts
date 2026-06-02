import SqlInsertQueryBuilder from "../abstract/SqlInsertQueryBuilder.ts";

export default class PgSqlInsertQueryBuilder extends SqlInsertQueryBuilder {
  /**
   * @todo
   */
  private _valueArray: unknown[][] = [];

  /**
   * @todo
   */
  private _bindIndex = 0;

  /**
   * @todo
   */
  private _bindValueArray: unknown[] = [];

  /**
   * @todo
   */
  private _columns: string = "";

  /**
   * @todo
   */
  public override get values() {
    return this._bindValueArray;
  }

  /**
   * @todo
   */
  public override columns(...columns: string[]): SqlInsertQueryBuilder {
    this._columns = columns.join(", ");
    return this;
  }

  /**
   * @todo
   */
  public override bind(value: unknown): string {
    this._bindIndex = this._bindIndex + 1;
    this._bindValueArray.push(value);
    return `$${this._bindIndex}`;
  }

  /**
   * @todo
   */
  public override build(): string {
    let rows = "";

    for (let x = 0; x < this._valueArray.length; x++) {
      rows = rows.concat("\r\n(");

      const row = this._valueArray[x].map((v) => this.bind(v)).join(",");
      rows = rows.concat(row);

      rows = rows.concat(")");

      if (x < this._valueArray.length - 1) {
        rows = rows.concat(",");
      }
    }

    return `INSERT INTO ${this._table} (${this._columns})
VALUES ${rows}`;
  }

  /**
   * @todo
   */
  public override rows(...values: unknown[][]): SqlInsertQueryBuilder {
    this._valueArray = values;
    return this;
  }
}
