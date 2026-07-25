import { type Join, JoinEnumerator } from "../enumerator/Join.ts";

/**
 * Abstract base class for PostgreSQL query builders.
 * Provides common functionality for building PostgreSQL queries.
 */
export abstract class PgBuilder {
  /** The columns to select (default: "*") */
  protected queryColumns: string = "*";

  /** The table to query */
  protected table: string = "";

  /** The next parameter position (PostgreSQL uses $1, $2, etc.) */
  protected parameterPosition: number = 1;

  /** Array of query parameters with their identifiers and values */
  protected readonly parameterArray: { id: string | number; value: unknown }[] =
    [];

  /** Array of WHERE conditions grouped by OR clauses */
  protected readonly whereArray: string[][] = [];

  /** The JOIN clauses for the query */
  protected joins: string = "";

  /**
   * Builds the WHERE clause string from the conditions array.
   * @returns The WHERE clause string with proper formatting
   */
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

  /**
   * Returns sorted parameters by their identifier.
   * @returns Array of parameters sorted by id
   */
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
   * Sets the table to query.
   * @param table - The table name
   * @returns The builder instance for method chaining
   */
  public from(table: string): this {
    this.table = table;
    return this;
  }

  /**
   * Sets a parameter value for the query.
   * @param value - The parameter value
   * @param name - Optional parameter name or position identifier
   * @returns The builder instance for method chaining
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
   * Adds a WHERE condition to the query.
   * @param condition - The condition string
   * @returns The builder instance for method chaining
   */
  public where(condition: string): this {
    return this.or(condition);
  }

  /**
   * Adds an AND condition to the current WHERE clause.
   * @param condition - The condition string to AND with existing conditions
   * @returns The builder instance for method chaining
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
   * Adds an OR condition to the WHERE clause.
   * @param condition - The condition string for the OR clause
   * @returns The builder instance for method chaining
   */
  public or(condition: string): this {
    this.whereArray.push([condition]);
    return this;
  }

  /**
   * Adds a JOIN clause to the query.
   * @param type - The type of JOIN (INNER, LEFT, RIGHT, FULL)
   * @param leftColumn - The column from the left table to join on
   * @param rightTable - The right table to join
   * @param rightColumn - The column from the right table to join on
   * @returns The builder instance for method chaining
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
   * Sets the columns to select or insert.
   * @param columns - Column names or expressions
   * @returns The builder instance for method chaining
   */
  public columns(...columns: string[]): this {
    this.queryColumns = columns.join(", ");
    return this;
  }
}
