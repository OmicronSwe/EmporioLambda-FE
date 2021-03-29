import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";
import Button from "react-bootstrap/Button";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const [session] = useSession();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="logo">
          <Image src="/images/Emporio_Lambda.png" layout="intrinsic" width={2488} height={398} />
        </div>
        <style jsx>
          {`
            .logo {
              max-width: 40em;
              margin: auto;
              padding-top: 1em;
            }
          `}
        </style>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/Cart">Cart</Link>
          {!session && (
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                signIn("cognito");
              }}
            >
              Sign in
            </Button>
          )}
          {session && session?.adm && <Link href="/dashboard">Merchant Dashboard</Link>}
          {session && (
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE}/api/auth/logout` });
              }}
            >
              Sign out
            </Button>
          )}
        </nav>
      </header>
      <div className="content">{children}</div>
      <footer id="footer">
        <div>
          <span>By Omicron</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
