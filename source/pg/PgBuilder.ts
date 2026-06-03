import { type Join, JoinEnumerator } from "../enumerator/Join.ts";

export default abstract class PgBuilder {
  /**
   * @todo
   */
  protected queryColumns: string = "*";

  /**
   * @todo
   * @protected
   */
  protected table: string = "";

  /**
   * @todo
   * @private
   */
  protected parameterPosition: number = 1;

  /**
   * @todo
   */
  protected readonly parameterArray: { id: string | number; value: unknown }[] =
    [];

  /**
   * @todo
   */
  protected readonly whereArray: string[][] = [];

  /**
   * @todo
   */
  protected joins: string = "";

  protected get queryWhere(): string {
    const length = this.whereArray.length;
    let where: string = "";

    if (length) {
      where = "\r\nWHERE ";
      for (let i = 0; i < length; i++) {
        where = where + this.whereArray[i].join(" AND ");
        if (i < length - 1) {
          where = `${where}\r\n   OR `;
        }
      }
    }

    return where;
  }

  protected get parameters(): { id: string | number; value: unknown }[] {
    return this.parameterArray.sort((a, b) => {
      if (typeof a.id === "number" && typeof b.id === "number") {
        return a.id - b.id;
      } else {
        if (typeof a.id === "number") {
          return -1;
        } else if (typeof b.id === "number") {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  /**
   * @todo
   * @param table
   */
  public from(table: string): this {
    this.table = table;
    return this;
  }

  /**
   * @todo
   * @param value
   * @param name
   */
  public setParameter(value: unknown, name?: string | number): this {
    if (name === undefined) {
      this.parameterArray.push({ id: this.parameterPosition++, value });
    } else {
      this.parameterArray.push({ id: name, value });
    }

    return this;
  }

  /**
   * @todo
   */
  public where(condition: string): this {
    return this.or(condition);
  }

  /**
   * @todo
   */
  public and(condition: string): this {
    if (this.whereArray.length === 0) {
      this.or(condition);
    } else {
      this.whereArray[this.whereArray.length - 1].push(condition);
    }
    return this;
  }

  /**
   * @todo
   */
  public or(condition: string): this {
    this.whereArray.push([condition]);
    return this;
  }

  /**
   * @todo
   */
  public join(
    type: Join,
    leftColumn: string,
    rightTable: string,
    rightColumn: string,
  ): this {
    this.joins = this.joins.concat(
      `\r\n${
        JoinEnumerator[type]
      } JOIN ${rightTable} ON ${leftColumn} = ${rightColumn}`,
    );
    return this;
  }

  /**
   * @todo
   */
  public columns(...columns: string[]): this {
    this.queryColumns = columns.join(", ");
    return this;
  }
}
