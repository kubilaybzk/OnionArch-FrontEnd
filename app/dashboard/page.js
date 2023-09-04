import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  return <div className="">{JSON.stringify(session,null,2)}</div>;
};

export default DashboardPage;
