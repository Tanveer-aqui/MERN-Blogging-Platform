import React from 'react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-zinc-300 mb-6 text-lg">
          Here you can find answers to common questions and get assistance for using our platform.
        </p>

        <div className="space-y-6">
          <div className="bg-zinc-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">How to Create a Blog Post?</h2>
            <p className="text-zinc-300">
              To create a blog post, navigate to the <strong>Create Post</strong> section using the menu. Fill out the required details such as the title, content, and tags, then click "Submit."
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">How to Bookmark a Post?</h2>
            <p className="text-zinc-300">
              While viewing a blog post, click the <strong>Bookmark</strong> icon. You can access all your bookmarks from the <strong>Bookmarks</strong> section in the menu.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">How to Edit My Profile?</h2>
            <p className="text-zinc-300">
              Visit the <strong>Profile</strong> section in the menu to update your details like username, bio, and profile picture.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">I Forgot My Password, What Should I Do?</h2>
            <p className="text-zinc-300">
              Click on the <strong>Forgot Password</strong> link on the login page. Enter your registered email address to receive a password reset link.
            </p>
          </div>

          <div className="bg-zinc-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">How to Report a Problem?</h2>
            <p className="text-zinc-300">
              If you encounter any issues, you can reach out to us via the <strong>Contact</strong> page. Provide details about the problem so we can assist you promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
