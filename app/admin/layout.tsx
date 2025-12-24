// Admin layout - middleware handles authentication
// Login page has its own layout that doesn't require auth
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

