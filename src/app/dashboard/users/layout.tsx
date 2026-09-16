import { redirect } from "next/navigation";
import { getServerSession, isUserAdmin } from "@/lib/auth-server";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/registrationProcess/login");
  }

  if (isUserAdmin(session)) {
    redirect("/dashboard/admin");
  }

  return <>{children}</>;
}
