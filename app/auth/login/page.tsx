import Text from "@/components/Text";
import { LoginForm } from "@/components/auth/LoginForm";
import { IconBentArrow } from "@/components/icons/IconBentArrow";

export default function LoginPage() {
  return (
    <div className="grid gap-8 p-4 w-full">
      <Text size="text-2xl" weight="font-bold" className="relative text-center">
        <IconBentArrow className="absolute w-10 -top-10 sm:left-32 md:-left-4 xl:left-14" />
        Login to your Journal account
      </Text>

      {/* <LoginForm selectedCriteria={selectedCriteria} /> */}
    </div>
  );
}
