import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthSidebar } from "@/components/auth/AuthSidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-flow-col xl:grid-cols-2">
      {/* sidebar component */}
      <AuthSidebar />

      <AuthContainer>{children}</AuthContainer>
    </main>
  );
}
