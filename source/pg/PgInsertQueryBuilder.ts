import type IInsertQueryBuilder from "../interface/IInsertQueryBuilder.ts";
import PgBuilder from "./PgBuilder.ts";
import type IQuery from "../interface/IQuery.ts";

/**
 * @todo
 */
export default class PgInsertQueryBuilder extends PgBuilder
  implements IInsertQueryBuilder {
  private _valueCount = 0;

  protected get queryRow(): string {
    let row: string = "(";

    for (let id = 0; id < this._valueCount; id++) {
      row = row.concat(`$${id + 1}`);

      if (id < this._valueCount - 1) {
        row = row.concat(`, `);
      }
    }

    return row.concat(")");
  }

  /**
   * @todo
   * @param table
   */
  public into(table: string): IInsertQueryBuilder {
    return this.from(table);
  }

  /**
   * @todo
   * @param values
   */
  public values(...values: unknown[]): IInsertQueryBuilder {
    for (const value of values) {
      this.setParameter(value);
      this._valueCount++;
    }

    return this;
  }

  /**
   * @todo
   */
  public build(): IQuery {
    return {
      parameters: this.parameters,
      query: `INSERT INTO ${this.table} (${this.queryColumns})` +
        `\r\nVALUES ${this.queryRow}`,
    };
  }
}
