import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const SearchResultsPage = async ({ searchParams: { location, propertyType }}) => {
  await connectDB();

  const locationPattern = new RegExp(location, 'i');  // i = case insensitive

  // Match location pattern against database fields
  let query = {
    $or: [  // or comes with Mongoose - or query to have multiple options
      { name: locationPattern },  // if e.g. Boston is in the name then it matches
      { description: locationPattern }, // if e.g. Boston is in the descripten then it matches
      { 'location.street': locationPattern }, // if e.g. Boston is in street then it matches
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  // Only check for property (type) if its not 'All' (default)
  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializeableObject(propertiesQueryResults);

  return <div>Search results</div>
};
export default SearchResultsPage;
