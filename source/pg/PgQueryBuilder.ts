import type ISelectQueryBuilder from "../interface/ISelectQueryBuilder.ts";
import type IDeleteQueryBuilder from "../interface/IDeleteQueryBuilder.ts";
import type IInsertQueryBuilder from "../interface/IInsertQueryBuilder.ts";
import type IUpdateQueryBuilder from "../interface/IUpdateQueryBuilder.ts";
import PgDeleteQueryBuilder from "./PgDeleteQueryBuilder.ts";
import PgInsertQueryBuilder from "./PgInsertQueryBuilder.ts";
import PgSelectQueryBuilder from "./PgSelectQueryBuilder.ts";
import PgUpdateQueryBuilder from "./PgUpdateQueryBuilder.ts";
import SqlQueryBuilder from "../abstract/SqlQueryBuilder.ts";

/**
 * @todo
 */
export default class PgQueryBuilder extends SqlQueryBuilder {
  /**
   * @todo
   */
  public override select(): ISelectQueryBuilder {
    return new PgSelectQueryBuilder();
  }

  /**
   * @todo
   */
  public override update(): IUpdateQueryBuilder {
    return new PgUpdateQueryBuilder();
  }

  /**
   * @todo
   */
  public override delete(): IDeleteQueryBuilder {
    return new PgDeleteQueryBuilder();
  }

  /**
   * @todo
   */
  public override insert(): IInsertQueryBuilder {
    return new PgInsertQueryBuilder();
  }
}
