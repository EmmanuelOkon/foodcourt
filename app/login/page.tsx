import Text from "@/components/Text";

import { IconBentArrow } from "@/components/icons/IconBentArrow";
import { AuthSidebar } from "@/components/auth/AuthSidebar";

import { AuthContainer } from "@/components/auth/AuthContainer";

export default function Page() {
  return (
    <main className="grid grid-flow-col xl:grid-cols-2">
      <AuthSidebar />

      <AuthContainer>
        <div className="grid gap-8 p-4 w-full">
          <Text
            size="text-2xl"
            weight="font-bold"
            className="relative text-center"
          >
            <IconBentArrow className="absolute w-10 -top-10 sm:left-32 md:-left-4 xl:left-14" />
            Login to your Library account
          </Text>
        </div>
        
      </AuthContainer>
    </main>
  );
}
