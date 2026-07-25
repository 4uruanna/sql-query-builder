import type { IInsertQueryBuilder } from "../interface/IInsertQueryBuilder.ts";
import { PgBuilder } from "./PgBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";

/**
 * PostgreSQL INSERT query builder.
 * Builds INSERT queries with support for RETURNING clause.
 */
export class PgInsertQueryBuilder extends PgBuilder
  implements IInsertQueryBuilder {
  /** Count of values to insert */
  private _valueCount = 0;

  /** RETURNING clause string */
  private _lastVal = "";

  /**
   * Builds the VALUES clause with parameter placeholders.
   * @returns The VALUES clause string with parameter placeholders
   */
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
   * Sets the table to insert into.
   * @param table - The table name
   * @returns The builder instance for method chaining
   */
  public into(table: string): IInsertQueryBuilder {
    return this.from(table);
  }

  /**
   * Sets the values to insert.
   * @param values - Values to insert (will be bound as parameters)
   * @returns The builder instance for method chaining
   */
  public values(...values: unknown[]): IInsertQueryBuilder {
    for (const value of values) {
      this.setParameter(value);
      this._valueCount++;
    }

    return this;
  }

  /**
   * Builds the final INSERT query.
   * @returns The query object containing the SQL string and parameters
   */
  public build(): IQuery {
    return {
      parameters: this.parameters,
      query: `INSERT INTO ${this.table} (${this.queryColumns})` +
        `\r\nVALUES ${this.queryRow}` +
        this._lastVal,
    };
  }

  /**
   * Adds a RETURNING clause to return specified columns.
   * @param columns - Column names to return
   * @returns The builder instance for method chaining
   */
  public returning(...columns: string[]): IInsertQueryBuilder {
    this._lastVal = `\r\nRETURNING ${columns.join(", ")}`;
    return this;
  }
}
