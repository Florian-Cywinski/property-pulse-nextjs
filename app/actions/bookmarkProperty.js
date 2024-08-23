'use server';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  // Find user in database
  const user = await User.findById(userId);

  // Check if property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);
  console.log(isBookmarked);

  let message;

  if (isBookmarked) {
    // If already bookmarked, remove it
    user.bookmarks.pull(propertyId);  // Mongoose extend the Array class with various methods, including pull https://mongoosejs.com/docs/5.x/docs/api/array.html#mongoosearray_MongooseArray-pull 
    message = 'Bookmark removed successfully';
    isBookmarked = false;
  } else {
    // If not bookmarked, add it
    user.bookmarks.push(propertyId);
    message = 'Bookmark added successfully';
    isBookmarked = true;
  }

  console.log(message);

  await user.save();
  revalidatePath('/properties/saved', 'page');  // /properties/saved is the path to be revalidate (where a property is (if bookmarked) or not (if not bookmarked))  // https://nextjs.org/docs/app/api-reference/functions/revalidatePath

  return { message, isBookmarked };
}

export default bookmarkProperty;
