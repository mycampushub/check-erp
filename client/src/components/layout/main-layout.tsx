import { ReactNode } from "react";
import Sidebar from "./sidebar";
import TopBar from "./top-bar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" data-testid="main-layout">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
