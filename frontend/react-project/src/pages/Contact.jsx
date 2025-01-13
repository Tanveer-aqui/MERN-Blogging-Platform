import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Contact Us
      </h1>
      <p className="text-center text-zinc-500 dark:text-zinc-300 mb-8 flex flex-col">
        If you have any questions, feedback, or suggestions, feel free to reach out to us.
        <span className='font-semibold'>We'd love to hear from you!</span>
      </p>

      <div className="text-center">
        <p className="text-lg text-gray-800 dark:text-gray-100 mb-4">
          <span className="font-medium">Email:</span>{' '}
          <a
            className="text-sky-500 hover:underline"
          >
            support@osuus.com
          </a>
        </p>

        <p className="text-lg text-gray-800 dark:text-gray-100 mb-4">
          <span className="font-medium">Twitter:</span>{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:underline"
          >
            @OSUUSOfficial
          </a>
        </p>

        <p className="text-lg text-gray-800 dark:text-gray-100">
          <span className="font-medium">GitHub:</span>{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:underline"
          >
            github.com/OSUUS
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
