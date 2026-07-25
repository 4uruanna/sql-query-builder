import { PgBuilder } from "./PgBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";
import type { IUpdateQueryBuilder } from "../interface/IUpdateQueryBuilder.ts";

/**
 * PostgreSQL UPDATE query builder.
 * Builds UPDATE queries with support for SET, WHERE, and JOIN clauses.
 */
export class PgUpdateQueryBuilder extends PgBuilder
  implements IUpdateQueryBuilder {
  /** Offset for SET parameter identifiers to avoid conflicts with WHERE parameters */
  private static readonly GAP: number = 256;
  /** Array of columns to update */
  private _setColumnArray: string[] = [];

  /**
   * Builds the SET clause string.
   * @returns The SET clause string with parameter placeholders
   */
  protected get querySets(): string {
    let query = "\r\nSET";

    for (let index = 0; index < this._setColumnArray.length; index++) {
      query = query.concat(
        `\n\r   ${this._setColumnArray[index]} = $${
          index + PgUpdateQueryBuilder.GAP
        }`,
      );

      if (index < this._setColumnArray.length - 1) {
        query = query.concat(`,`);
      }
    }

    return query;
  }

  /**
   * Sets a column to update with a new value.
   * @param column - The column name to update
   * @param value - The new value for the column
   * @returns The builder instance for method chaining
   */
  public set(column: string, value: unknown): IUpdateQueryBuilder {
    this.setParameter(
      value,
      this._setColumnArray.length + PgUpdateQueryBuilder.GAP,
    );
    this._setColumnArray.push(column);
    return this;
  }

  /**
   * Builds the final UPDATE query.
   * @returns The query object containing the SQL string and parameters
   */
  public build(): IQuery {
    let query = `UPDATE ${this.table}` +
      this.querySets +
      this.joins +
      this.queryWhere;

    return {
      parameters: this.parameters
        .map(
          (parameter, index) => {
            query = query.replaceAll(`$${parameter.id}`, `$${index + 1}`);
            parameter.id = index + 1;
            return parameter;
          },
        ),
      query,
    };
  }
}
