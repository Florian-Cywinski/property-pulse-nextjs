'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({  // countDocuments is a method from MongoDB
    recipient: userId,  // Count documents where the recipient = userId and read = false
    read: false,
  });

  return { count };
}

export default getUnreadMessageCount;
