import { NextPage } from "next";
import { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Home from "../components/Home";
import { useTranslation } from 'react-i18next';

const HomePage: NextPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("Home Screen");
  }, [])
  
  return <Home />
}

export default withPageAuthRequired(HomePage);