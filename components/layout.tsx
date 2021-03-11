import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
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

export default Layout;
