import Image from "next/image";
import { AppLogo } from "../AppLogo";
import Text from "../Text";

export const AuthSidebar = () => {
  return (
    <section className="w-full h-screen hidden md:grid md:grid-rows-[8fr_4fr]">
      <div className="relative w-full border-b-4 border-primary-base">
        <Image
          src="/images/journal-photo.jpg"
          alt="Auth sidebar image"
          className="absolute z-0 object-cover"
          sizes="100w"
          fill
          priority
        />
      </div>

      <div className="h-full w-full bg-blue-dark p-[50px] pb-[80px]">
        <div className="grid gap-6">
          <AppLogo background="dark" />

          <Text
            color="text-white"
            className="max-w-[600px]"
            size="text-4xl"
            weight="font-bold"
          >
            Welcome to Journal, Where Knowledge Takes Flight!
          </Text>

          <Text
            color="text-white"
            className="max-w-[600px]"
            size="text-lg"
            weight="font-thin"
          >
            Explore the boundless realms of intellect, share your discoveries,
            and embark on a journey of enlightenment
          </Text>
        </div>
      </div>
    </section>
  );
};
