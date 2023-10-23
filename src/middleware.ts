import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const unprotectedRoutes = ["/"]

export default withAuth(
  async function middleware(req) {
    // Get token
    const sessionToken =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value

    const isAuth = !!sessionToken

    // Check if they are logged in on the home page
    if (req.nextUrl.pathname === "/") {
      if (isAuth) return NextResponse.redirect(new URL(`/dashboard`, req.url))
      return
    }

    // Redirect unauthed users to the signin page
    if (!unprotectedRoutes.includes(req.nextUrl.pathname) && !isAuth)
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${req.nextUrl.pathname}`, req.url)
      )
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        return true
      },
    },
  }
)
