import { LogoutButton } from "../components/user/logout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Arihant</h1>
      <LogoutButton />
    </main>
  );
}
