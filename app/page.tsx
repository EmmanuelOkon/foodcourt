import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>This is home</p>
        <Link href="/auth/login">Login</Link>
      </div>
    </main>
  );
}
