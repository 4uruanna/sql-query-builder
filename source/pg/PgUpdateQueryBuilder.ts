import { PgBuilder } from "./PgBuilder.ts";
import type { IQuery } from "../interface/IQuery.ts";
import type { IUpdateQueryBuilder } from "../interface/IUpdateQueryBuilder.ts";

/**
 * @todo
 */
export class PgUpdateQueryBuilder extends PgBuilder
  implements IUpdateQueryBuilder {
  private static readonly GAP: number = 256;
  private _setColumnArray: string[] = [];

  /**
   * @todo
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
   * @todo
   * @param column
   * @param value
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
   * @todo
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
            query = query.replaceAll(`$${parameter.id}`, `$${index+1}`)
            parameter.id = index+1;
            return parameter;
          }
        ),
      query
    };
  }
}
