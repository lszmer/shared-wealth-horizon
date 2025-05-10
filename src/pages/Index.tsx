
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TabBar } from "@/components/tab-bar";
import { TileVisibilityProvider } from "@/context/TileVisibilityContext";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  
  return (
    <TileVisibilityProvider>
      <TabBar currentTab="home" />
    </TileVisibilityProvider>
  );
}
