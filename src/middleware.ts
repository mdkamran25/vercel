export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/room/:code*","/profile/:id*"],
};
