import PropertyCard from '@/components/PropertyCard';
import Property from '@/models/Property';
import connectDB from '@/config/database';

const PropertiesPage = async () => {
  // console.log(properties);

  // Fetch Properties
  await connectDB();
  const properties = await Property.find({}).lean();  // .find({}) to get all properties  // .lean() optimizes query performance by returning plain JS objects instead of mongoose documents (it's just for read only)
  
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );

};

export default PropertiesPage;