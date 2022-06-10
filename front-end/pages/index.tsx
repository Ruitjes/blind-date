import { NextPage } from "next";
import { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Home from "../components/Home";

const HomePage: NextPage = () => {

  useEffect(() => {
    document.title = "Home Page"
  }, [])
  
  return <Home />
}

export default withPageAuthRequired(HomePage);