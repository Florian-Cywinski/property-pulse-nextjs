/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 * 
 * The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs), not Mongoose documents.
 * 
 * lean() method of the Mongoose API is used on the Query objects. It allows us to know whether the returned document is a Javascript object or a mongoose document object. Using this method we can configure the options for the query object.
 *
 * @param {Object} leanDocument - The Mongoose lean document to be converted.
 * @returns {Object} A plain JavaScript object that is a serializable representation of the input document.
 */

export function convertToSerializeableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString)
      leanDocument[key] = leanDocument[key].toString();
  }
  return leanDocument;
}
