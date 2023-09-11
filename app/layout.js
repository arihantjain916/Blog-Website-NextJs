import './globals.css'

export const metadata = {
  title: 'Auth Checker Website',
  description: 'Testing website to check auth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">{children}</body>
    </html>
  )
}
