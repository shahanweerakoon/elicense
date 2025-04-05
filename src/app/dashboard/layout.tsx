import {Sidebar} from "@/app/components/sidebar";
import { DmtHeader } from "../components/dmtHeader";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col h-screen">
        <DmtHeader  />
        <div className="flex">
        <Sidebar />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
        
      </div>
    );
  }