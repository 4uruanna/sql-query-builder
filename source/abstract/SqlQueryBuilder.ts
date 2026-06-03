import type { ISelectQueryBuilder } from "../interface/ISelectQueryBuilder.ts";
import type { IDeleteQueryBuilder } from "../interface/IDeleteQueryBuilder.ts";
import type { IInsertQueryBuilder } from "../interface/IInsertQueryBuilder.ts";
import type { IUpdateQueryBuilder } from "../interface/IUpdateQueryBuilder.ts";

/**
 * Main sql builder
 */
export abstract class SqlQueryBuilder {
  /**
   * Return delete builder
   */
  public abstract delete(): IDeleteQueryBuilder;

  /**
   * Return insert builder
   */
  public abstract insert(): IInsertQueryBuilder;

  /**
   * Return select builder
   */
  public abstract select(): ISelectQueryBuilder;

  /**
   * Return update builder
   */
  public abstract update(): IUpdateQueryBuilder;
}
