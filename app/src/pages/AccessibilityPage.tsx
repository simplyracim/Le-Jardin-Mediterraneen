export default function AccessibilityPage() {
  return (
    <div className="bg-white pt-32 pb-20">
      <div className="container-custom max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl text-brown mb-10">Accessibility Statement</h1>
        <div className="space-y-8">
          {[
            { title: 'Our Commitment', body: 'Le Jardin Méditerranéen is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.' },
            { title: 'Accessibility Features', body: 'Our website is designed to be compatible with screen readers and keyboard navigation. We follow WCAG 2.1 Level AA guidelines to ensure our content is accessible to all users. Features include proper heading structure, alt text for images, sufficient color contrast, and resizable text.' },
            { title: 'Feedback', body: 'We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know.' },
            { title: 'Contact', body: 'For accessibility-related inquiries, please contact us at info@lejardinmtl.com or call us at (438) 330-6424.' },
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
