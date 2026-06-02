import type ISqlWhere from "./ISqlWhere.ts";

export default interface ISqlWhereBuilder<T extends ISqlWhere<T>> {
    /**
     * @todo
     */
    and(condition: string): ISqlWhereBuilder<T>;

    /**
     * @todo
     */
    or(condition: string): ISqlWhereBuilder<T>;

    /**
     * @todo
     */
    build(): T;
}