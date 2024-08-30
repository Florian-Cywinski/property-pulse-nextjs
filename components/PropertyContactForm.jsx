'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addMessage from '@/app/actions/addMessage';
// import SubmitMessageButton from './SubmitMessageButton';

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession(); // rename data to session

  const [state, formAction] = useFormState(addMessage, {});  // addMessage is the action passed in -> it returns an object with the "submitted"-value (true or false) -> this output is in state  // {} is the initial state -> here an empty object  // formAction to run the action (save form input to the collection)

  useEffect(() => { // To have a toast
    if (state.error) toast.error(state.error);  // state.error could come from addMessage.js (action)
    if (state.submitted) toast.success('Message sent successfully');
  }, [state]);

  if (state.submitted) {  // state.submitted can be either true or false
    return (
      <p className='text-green-500 mb-4'>
        Your message has been sent successfully
      </p>
    );
  }

  return (
    session && (  // if session then return the form
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
        <form action={formAction}>    {/* addMessage.js (action) */}
          <input
            type='hidden' // The input field is not visible - it's just to send the required data automatically
            id='property'
            name='property'
            defaultValue={property._id}
          />
          <input
            type='hidden'
            id='recipient'
            name='recipient'
            defaultValue={property.owner}
          />
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              name='name'
              type='text'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              name='email'
              type='email'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'
            >
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              name='phone'
              type='text'
              placeholder='Enter your phone number'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='message'
            >
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              name='message'
              placeholder='Enter your message'
            ></textarea>
          </div>
          <div>
            <button type="submit">Submit the Message</button>
            {/* <SubmitMessageButton /> */}
          </div>
        </form>
      </div>
    )
  );
};
export default PropertyContactForm;
