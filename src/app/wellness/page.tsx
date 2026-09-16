import { redirect } from "next/navigation";

export default function WellnessRedirect() {
  redirect("/dashboard/users/wellness");
}
