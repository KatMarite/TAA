import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Training Africa Academy — Digital Learning & Workforce Platform',
  description:
    'QCTO & Services SETA-aligned digital learning, course discovery, corporate workforce training, learnership application, and assessment centre booking platform for Training Africa Academy.',
  openGraph: {
    title: 'Training Africa Academy — Digital Learning & Workforce Platform',
    description:
      'QCTO & Services SETA-aligned digital learning, course discovery, corporate workforce training, learnership application, and assessment centre booking platform for Training Africa Academy.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Training Africa Academy — Digital Learning & Workforce Platform',
    description:
      'QCTO & Services SETA-aligned digital learning, course discovery, corporate workforce training, learnership application, and assessment centre booking platform for Training Africa Academy.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-sans selection:bg-[var(--brand-primary)]/15 selection:text-[var(--text-primary)]"
      >
        {children}
      </body>
    </html>
  );
}
