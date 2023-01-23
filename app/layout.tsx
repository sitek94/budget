import './globals.css'
import Link from 'next/link'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav className="flex gap-2 border-b border-gray-200 p-2">
          <Link className="hover:underline" href="/budget">
            Budget
          </Link>
          <Link className="hover:underline" href="/expenses">
            Expenses
          </Link>
        </nav>
        <main className="p-2">{children}</main>
      </body>
    </html>
  )
}
