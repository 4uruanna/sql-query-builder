/**
 * Enumerator for SQL comparison operators.
 */
export const OperatorEnumerator = {
  /** Equality operator */
  IS_EQUAL: "=",
  /** Greater than operator */
  IS_GREATER: ">",
  /** Less than operator */
  IS_LESS: "<",
  /** Greater than or equal operator */
  IS_GREATER_OR_EQUAL: ">=",
  /** Less than or equal operator */
  IS_LESS_OR_EQUAL: "<=",
  /** Not equal operator */
  IS_NOT_EQUAL: "<>",
  /** LIKE operator for pattern matching */
  IS_LIKE: "LIKE",
  /** NOT LIKE operator for pattern matching */
  IS_NOT_LIKE: "NOT LIKE",
  /** IN operator for set membership */
  IS_IN: "IN",
  /** NOT IN operator for set membership */
  IS_NOT_IN: "NOT IN",
  /** IS NULL operator */
  IS_NULL: "IS NULL",
  /** IS NOT NULL operator */
  IS_NOT_NULL: "IS NOT NULL",
};

/**
 * Type representing valid SQL operators.
 */
export type Operator = keyof typeof OperatorEnumerator;
