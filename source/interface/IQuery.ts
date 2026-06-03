/**
 * @todo
 */
export default interface IQuery {
  query: string;
  parameters: { id: string | number; value: unknown }[];
}
