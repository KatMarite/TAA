import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D91B24',
};

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
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-sans selection:bg-[var(--brand-primary)]/15 selection:text-[var(--text-primary)]"
      >
        {children}
      </body>
    </html>
  );
}
