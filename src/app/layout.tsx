import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { CursorFollowGradient } from '@/components/ui/cursor-gradient';

export const metadata: Metadata = {
  title: "Amal Shaheen Portfolio",
  description: 'Engineering Student & Full-Stack Developer. A well-rounded software engineer who lives and builds with purpose and impact.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      <meta name="google-site-verification" content="hBbt1v7ep1O5o1nUPEt4UPIlETBWxZ-oDdrQc_jA6ng" />
      </head>
      <body className="font-body antialiased">
        <CursorFollowGradient />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}