import {Sidebar} from "@/app/components/sidebar";
import { DmtHeader } from "../components/dmtHeader";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
          <DmtHeader />
          <main className="flex-1 p-4">
            {children}
          </main>
          </div>
          
      </div>
    );
  }