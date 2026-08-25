export default function TermsOfUsePage() {
  return (
    <div className="bg-white pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-brown mb-4">Terms of Use</h1>
        <p className="text-brown/50 text-sm italic mb-10">Last updated: January 1, 2026</p>
        <div className="space-y-8">
          {[
            { title: 'Acceptance of Terms', body: 'By accessing and using the Le Jardin Méditerranéen website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.' },
            { title: 'Use of Website', body: 'You may use our website for lawful purposes only. You agree not to use the website in any way that could damage, disable, overburden, or impair our servers or networks.' },
            { title: 'Reservations', body: 'Reservations are subject to availability. We reserve the right to cancel or modify reservations as necessary. A valid phone number and email address are required for all reservations.' },
            { title: 'Gift Cards', body: 'Gift cards are non-refundable and cannot be redeemed for cash. Lost or stolen gift cards cannot be replaced. Gift cards do not expire.' },
            { title: 'Intellectual Property', body: 'All content on this website, including text, graphics, logos, and images, is the property of Le Jardin Méditerranéen and is protected by copyright and other intellectual property laws.' },
            { title: 'Limitation of Liability', body: 'Le Jardin Méditerranéen shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the website.' },
            { title: 'Governing Law', body: 'These Terms of Use shall be governed by and construed in accordance with the laws of the Province of Quebec, Canada.' },
            { title: 'Changes to Terms', body: 'We reserve the right to modify these Terms of Use at any time. Your continued use of the website after any changes indicates your acceptance of the updated terms.' },
          ].map((s) => (
            <div key={s.title}>
              <h3 className="font-serif text-2xl text-brown mb-3">{s.title}</h3>
              <p className="text-brown/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
