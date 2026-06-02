import type ISqlWhere from "../interface/ISqlWhere.ts";
import type ISqlWhereBuilder from "../interface/ISqlWhereBuilder.ts";

/**
 * @todo
 */
export default class PgSqlWhereBuilder<T extends ISqlWhere<T>>
  implements ISqlWhereBuilder<T> {
  /**
   * @todo
   */
  private readonly _mainBuilder: T;

  /**
   * @todo
   */
  private readonly _whereArray: string[][] = [];

  /**
   * @todo
   */
  public constructor(mainBuilder: T, condition: string) {
    this._mainBuilder = mainBuilder;
    this._whereArray.push([condition]);
  }

  /**
   * @todo
   */
  public and(condition: string): ISqlWhereBuilder<T> {
    if (this._whereArray.length === 0) {
      this.or(condition);
    } else {
      this._whereArray[this._whereArray.length - 1].push(condition);
    }

    return this;
  }

  /**
   * @todo
   */
  public build(): T {
    let where = "";

    if (this._whereArray.length) {
      where = "WHERE ";
      for (let i = 0; i < this._whereArray.length; i++) {
        where = where + this._whereArray[i].join("\r\n\tAND ");
        if (i < this._whereArray.length - 1) {
          where = `${where}\r\n\tOR `;
        }
      }
    }

    this._mainBuilder.setWhere(where);
    return this._mainBuilder;
  }

  /**
   * @todo
   */
  public or(condition: string): ISqlWhereBuilder<T> {
    this._whereArray.push([condition]);

    return this;
  }
}
