export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-brown mb-4">Privacy Policy</h1>
        <p className="text-brown/50 text-sm italic mb-10">Last updated: January 1, 2026</p>

        <div className="space-y-8">
          {[
            { title: 'Introduction', body: 'Le Jardin Méditerranéen is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.' },
            { title: 'Information We Collect', body: 'We collect information you provide directly to us, including your name, email address, phone number, and reservation details. We also collect information automatically through cookies and similar technologies.' },
            { title: 'How We Use Your Information', body: 'We use your information to process reservations, respond to inquiries, send promotional communications, and improve our services. We do not sell your personal information to third parties.' },
            { title: 'Information Sharing', body: 'We may share your information with trusted service providers who assist us in operating our website and conducting our business. These parties are obligated to keep your information confidential.' },
            { title: 'Data Security', body: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
            { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information. You may also opt out of receiving promotional communications from us at any time.' },
            { title: 'Cookies', body: 'We use cookies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.' },
            { title: 'Contact Us', body: 'If you have any questions about this Privacy Policy, please contact us at info@lejardinmtl.com.' },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-2xl text-brown mb-3">{section.title}</h3>
              <p className="text-brown/70 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
