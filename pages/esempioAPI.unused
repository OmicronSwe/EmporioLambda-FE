import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import getlambdaResponse from "./api/lib/lambdas";

import Layout from "../components/layout";

const Dashboard = ({ products, session }) => {
  return (
    <>
      <Layout title="Dashboard page">
        <h1>Hello!</h1>
        <p>{JSON.stringify(session, null, 2)}</p>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const ses = await getSession({ req });
  return {
    props: {
      products: await (await getlambdaResponse("hello", "GET", ses ? ses.accessToken : undefined))
        .props.response,
      session: ses,
    },
  };
};

export default Dashboard;
