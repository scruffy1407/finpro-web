import Head from "next/head";

interface HeadProps {
  children: React.ReactNode;
}
function Header({ children }: HeadProps) {
  return <Head>{children}</Head>;
}

export default Header;
