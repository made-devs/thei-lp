import { Oswald } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'THEI - Servis & Repair Alat Berat | Heavy Equipment Expert',
  description:
    'Solusi servis alat berat cepat, presisi, dan bergaransi. Paket premium, economis, repair, rental, dan contract service untuk unit Anda. Minimalkan downtime sekarang.',
  keywords:
    'servis alat berat, repair alat berat, rental alat berat, excavator, forklift, crane, bulldozer, motor grader',
  authors: [{ name: 'THEI Heavy Equipment' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'THEI - Servis & Repair Alat Berat | Heavy Equipment Expert',
    description:
      'Solusi servis alat berat terpercaya dengan teknisi berpengalaman dan suku cadang original.',
    url: 'https://thei-lp.com',
    siteName: 'THEI Heavy Equipment',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFD700" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${oswald.variable} antialiased`}>
        {children}

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17796140228"
          strategy="afterInteractive"
        />
        <Script id="gtag-aw" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17796140228');
          `}
        </Script>
      </body>
    </html>
  );
}
