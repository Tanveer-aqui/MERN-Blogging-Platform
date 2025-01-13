import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="container mx-auto px-6 lg:px-16 py-8 bg-zinc-900">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
        Terms of Use
      </h1>

      <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6">
        <p>
          By accessing or using our platform, you agree to be bound by the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">1. Accepting the Terms</h2>
        <p>
          By accessing the OSUUS website or using our application, you accept and agree to comply with these Terms of Use. If you do not agree with any of these terms, you should not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">2. User Responsibilities</h2>
        <p>
          Users are responsible for maintaining the confidentiality of their account and ensuring that all activity on their account complies with the applicable laws. You agree not to post any content that is illegal, harmful, or violates the rights of others.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">3. Content Ownership</h2>
        <p>
          You retain ownership of the content you post on OSUUS. However, by submitting content, you grant OSUUS a worldwide, royalty-free license to use, display, and distribute such content on our platform.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">4. Prohibited Use</h2>
        <p>
          You are prohibited from using OSUUS for any unlawful activities, including but not limited to spamming, harassment, or the dissemination of malware. Any such behavior will result in the termination of your account.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">5. Limitation of Liability</h2>
        <p>
          OSUUS is not responsible for any damages arising from your use or inability to use the service. We do not guarantee the availability, reliability, or functionality of the platform at all times.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">6. Changes to Terms</h2>
        <p>
          OSUUS reserves the right to modify or update these Terms of Use at any time. Users will be notified of significant changes, and continued use of the platform indicates your acceptance of the modified terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">7. Governing Law</h2>
        <p>
          These terms will be governed by and construed in accordance with the laws of the jurisdiction where OSUUS operates, without regard to its conflict of law principles.
        </p>

        <p className="mt-4">
          If you have any questions about these Terms of Use, feel free to contact us at{' '}
          <a
            href="mailto:support@osuus.com"
            className="text-sky-400 hover:underline"
          >
            support@osuus.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
