import { useState } from "react";
import { Head } from "@impalajs/react/head";

interface AppProps {
  title: string;
}

export const App: React.FC<React.PropsWithChildren<AppProps>> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};
