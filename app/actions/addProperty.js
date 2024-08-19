'use server';
import connectDB from '@/config/database';
import Property from '@/models/Property'; // To save a property to the db
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';  // To update the cache / listing after submission
import { redirect } from 'next/navigation';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Access all values for amenities and images
  const amenities = formData.getAll('amenities');
  // const images = formData.getAll('images').filter((image) => image.name !== '').map((image) => image.name);  // .getAll('images') to get all images from the form input (name="images")  // .filter((image) => image.name !== '') to filter out all empty names  // .map((image) to crate an array of image names
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
    // images,
  };
  // console.log(propertyData);

  const imageUrls = [];

  // To loop through the images object from the form
  for (const imageFile of images) { // images is the image object uploaded in the form
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert the image data to base64
    const imageBase64 = imageData.toString('base64'); // This is how it has to be for the request

    // Make request to upload to Cloudinary (to upload the image(s))
    const result = await cloudinary.uploader.upload(  // result is an object
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'propertypulse',  // The cloudinary folder
      }
    );

    imageUrls.push(result.secure_url);  // secure_url is the cloudinary URL
  }

  propertyData.images = imageUrls;  // To add these url's to the db

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');

  redirect(`/properties/${newProperty._id}`);
  
}

export default addProperty;