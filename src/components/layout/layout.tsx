export default function Layout({ children, ...props }: { 
  children: React.ReactNode
}) {
  return (
    <div {...props}>
      {children}
    </div>
  )
}