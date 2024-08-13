import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
  // Get the 3 latest properties
  // const recentProperties = properties.slice(0, 3);

  await connectDB();

  // Get the 3 latest properties
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })  // To get the latest
    .limit(3)
    .lean();

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {recentProperties.map((property, index) => (
                <PropertyCard property={property} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  )
};

export default HomeProperties;
