import Text from "@/components/Text";
// import { LoginForm } from "@/components/auth/LoginForm";
import { IconBentArrow } from "@/components/icons/IconBentArrow";
import { AuthSidebar } from "@/components/auth/AuthSidebar";

import { AuthContainer } from "@/components/auth/AuthContainer";
import Link from "next/link";

export default function Page() {
  return (
    <main className="grid grid-flow-col xl:grid-cols-2">
      welcome
      <div>
        <Link href="/login">Login</Link>
      </div>

      
    </main>
  );
}
