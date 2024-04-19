import Link from "next/link";

export default function Page() {
  return (
    <main className="w-full items-center h-screen flex gap-10 flex-col bg-blue-200 justify-center">
      <div>
        <h1 className="text-5xl text-center">Welcome to Library</h1>
      </div>
      <div className="w-[400px] text-center ">
        <Link
          className="bg-primary text-white px-14 py-4 rounded-md w-full "
          href="/login"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
