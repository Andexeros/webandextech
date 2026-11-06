import { forwardRef } from "react";
import { toHash } from "./router";
const Link = forwardRef<HTMLAnchorElement, any>(function Link({ href, children, ...rest }, ref) {
  return <a ref={ref} href={toHash(String(href))} {...rest}>{children}</a>;
});
export default Link;
