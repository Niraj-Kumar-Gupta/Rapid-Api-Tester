import React from 'react';

const History = ({ history, onDelete, onCopy, onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-screen bg-black bg-opacity-80 flex items-end justify-end z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full h-full overflow-y-auto backdrop-blur-md border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Request History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={index}
              className={`p-3 border border-gray-200 rounded-md shadow-sm ${
                item.method === 'GET' ? 'bg-blue-50 text-blue-800' : 'bg-green-50 text-green-800'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1 flex items-center">
                  <span className='px-2 py-1 bg-gray-800 text-white rounded-md shadow-sm opacity-80'>
                    {item.method}
                  </span>
                  <span className="text-xs text-gray-500 ml-3">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onCopy(item.url)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-xs break-all">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
