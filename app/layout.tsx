import type { Metadata } from 'next'
import '../Styles.css'

export const metadata: Metadata = {
  title: 'navik — HR, WFM & Payroll',
  description: 'Manage your entire workforce — office & field — in one platform. HR, Attendance, Field Tracking & Payroll. Trusted by 500+ companies.',
  keywords: ['HRMS Software', 'Payroll Software', 'Attendance Management System', 'Workforce Management', 'Employee Tracking', 'Field Employee Tracking', 'HR Software India', 'Navik'],
  authors: [{ name: 'navik' }],
  robots: 'index, follow',
  themeColor: '#0f1f4b',
  openGraph: {
    type: 'website',
    title: 'navik — Complete Workforce Management Platform',
    description: 'Manage your entire workforce — office & field — in one platform. HR, Attendance, Field Tracking & Payroll.',
    url: 'https://navik.in',
    siteName: 'navik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'navik — Complete Workforce Management Platform',
    description: 'HR, Attendance, Field Tracking & Payroll in one platform.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/dne97stwg/image/upload/w_192,h_192,c_fill,f_auto,q_auto/v1777609760/App_Icon_-_Gradient_Accent-removebg-preview_k2s3it.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dne97stwg/image/upload/w_192,h_192,c_fill,f_auto,q_auto/v1777609760/App_Icon_-_Gradient_Accent-removebg-preview_k2s3it.png" />
      </head>
      <body>
        <div id="scroll-progress"></div>
        {children}
        <script src="/main.js" defer></script>
      </body>
    </html>
  )
}
