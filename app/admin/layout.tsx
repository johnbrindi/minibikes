export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Admin pages use the root layout without the public Navbar (ConditionalLayout handles that)
    return <>{children}</>;
}
