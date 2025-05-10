
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Portfolio from "./Portfolio";
import { TabBar } from "@/components/tab-bar";

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <>
      <Portfolio />
      <TabBar currentTab="home" />
    </>
  );
}
