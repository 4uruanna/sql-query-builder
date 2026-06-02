/**
 * @todo
 */
export const OperatorEnumerator = {
  IS_EQUAL: "=",
  IS_GREATER: ">",
  IS_LESS: "<",
  IS_GREATER_OR_EQUAL: ">=",
  IS_LESS_OR_EQUAL: "<=",
  IS_NOT_EQUAL: "<>",
  IS_LIKE: "LIKE",
  IS_NOT_LIKE: "NOT LIKE",
  IS_IN: "IN",
  IS_NOT_IN: "NOT IN",
  IS_NULL: "IS NULL",
  IS_NOT_NULL: "IS NOT NULL",
};

/**
 * @todo
 */
export type Operator = keyof typeof OperatorEnumerator;
