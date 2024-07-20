import React from 'react';

export default function Navbar({ onOpenModal }) {
  return (
    <div
      className='mx-auto my-7 w-[80%] px-3 bg-white shadow-lg rounded-lg'
    >
      <div >
        <div className='flex max-w-6xl mx-auto justify-between items-center py-1'>
          <span className='text-2xl font-semibold text-orange-500 px-4'>
            <img src='https://mms.businesswire.com/media/20201021005412/en/832238/23/RapidAPI_logo_blue.jpg' className='w-50 h-14'/>
          </span>
          <button
            onClick={onOpenModal}
            className='px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300'
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
}
