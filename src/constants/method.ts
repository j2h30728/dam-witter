const METHOD = {
  DELETE: 'DELETE',
  GET: 'GET',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
} as const;

export default METHOD;

export type METHOD_TYPE = (typeof METHOD)[keyof typeof METHOD];
