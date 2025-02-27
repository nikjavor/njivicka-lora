import { login, signup } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-light">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border border-neutral">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Prijava
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-dark">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-dark">
            Geslo:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-neutral rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            formAction={login}
            className="w-full py-2 px-4 bg-primary text-white rounded-md shadow-sm text-sm font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            Prijavi se
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            formAction={signup}
            className="w-full py-2 px-4 border border-secondary text-secondary bg-transparent rounded-md shadow-sm text-sm font-medium cursor-not-allowed opacity-50"
            disabled
          >
            Registracija (onemogočeno)
          </button>
        </div>
      </form>
    </div>
  );
}
