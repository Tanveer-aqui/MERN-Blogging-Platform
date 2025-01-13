import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container px-6 py-8 lg:px-16 lg:py-8 bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="text-lg text-gray-700 dark:text-gray-300 space-y-6">
        <p>
          Your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your information when you use our platform to share your thoughts and connect with others.
        </p>

        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          When you use OSUUS, we may collect the following types of information:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Personal Information:</strong> Such as your name, email
            address, and profile details when you register or update your account.
          </li>
          <li>
            <strong>Content:</strong> Blog posts, comments, and other content you
            create or share on OSUUS.
          </li>
          <li>
            <strong>Usage Data:</strong> Details about how you interact with the
            platform, such as pages visited, time spent, and preferences.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Provide and improve the OSUUS platform and user experience.</li>
          <li>Moderate content to ensure a safe and respectful environment.</li>
          <li>
            Send updates, notifications, and promotional materials (with your
            consent).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
        <p>
          We do not sell your personal information to third parties. However, we
          may share your data in the following situations:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>With trusted service providers to help us operate the platform.</li>
          <li>To comply with legal obligations or protect our rights.</li>
        </ul>

        <h2 className="text-2xl font-semibold">4. Your Choices</h2>
        <p>
          You have control over your data. You can update your profile, delete
          posts, or request account deletion by contacting us.
        </p>

        <h2 className="text-2xl font-semibold">5. Security</h2>
        <p>
          We take the security of your information seriously and implement
          measures to protect it. However, no system is completely secure, so
          please use the platform responsibly.
        </p>

        <h2 className="text-2xl font-semibold">6. Updates to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. You will be
          notified of any significant changes via the platform or email.
        </p>

        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please reach out
          to us at <a href="mailto:support@osuus.com" className="text-blue-500 hover:underline">support@osuus.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
