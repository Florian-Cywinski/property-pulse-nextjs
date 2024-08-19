'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property'; // To save a property to the db
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';  // To update the cache / listing after submission
import { redirect } from 'next/navigation';
// import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Access all values for amenities and images
  const amenities = formData.getAll('amenities');
  const images = formData.getAll('images').filter((image) => image.name !== '');  // .getAll('images') to get all images from the form input (name="images")  // .filter((image) => image.name !== '') to filter out all empty names

  // Create the propertyData object with embedded seller_info
  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,  // amenities = formData.getAll('amenities'); -> see above
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'), // seller_info.name
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    images,
  };
  // console.log(propertyData);

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');

  redirect(`/properties/${newProperty._id}`);
  
}

export default addProperty;