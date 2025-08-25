import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    // user logged in → send them to workspace
    redirect("/workspace")
  } else {
    // no session → send them to register
    redirect("/register")
  }
}
