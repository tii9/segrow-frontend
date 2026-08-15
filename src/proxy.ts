import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/sign-in", "/sign-up"];

const protectedRoutes = [
  "/account/settings",
  "/account/order-list",
  "/account/order-details",
  "/cart",
  "/cart/checkout",
  "/favorite",
];

const isRouteMatch = (pathname: string, route: string) => {
  return pathname === route || pathname.startsWith(`${route}/`);
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get("better-auth.session_token")?.value;

  const isAuthRoute = authRoutes.some((route) => isRouteMatch(pathname, route));

  const isProtectedRoute = protectedRoutes.some((route) =>
    isRouteMatch(pathname, route),
  );

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/sign-in", req.url);

    return NextResponse.redirect(signInUrl);
  }

  if (pathname.startsWith("/cart/checkout")) {
    try {
      const rawCookieHeader = req.headers.get("cookie") ?? "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
        {
          headers: {
            Cookie: rawCookieHeader,
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL("/cart", req.url));
      }

      const resData = await response.json();
      const cart = resData.data;

      const isCartEmpty =
        !cart ||
        !Array.isArray(cart.items) ||
        cart.items.length === 0 ||
        cart.totalItem === 0;

      if (isCartEmpty) {
        return NextResponse.redirect(new URL("/cart", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/cart", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
