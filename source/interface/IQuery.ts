/**
 * Represents a built SQL query with its parameters.
 */
export interface IQuery {
  /** The SQL query string */
  query: string;
  /** Array of query parameters with their identifiers and values */
  parameters: { id: string | number; value: unknown }[];
}
