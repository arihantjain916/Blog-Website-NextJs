import { LogoutButton } from "../components/user/logout";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-6xl font-bold">Arihant Jain's Home Page</h1>
      <LogoutButton />
    </main>
  );
}
