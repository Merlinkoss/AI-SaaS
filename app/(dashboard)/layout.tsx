import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getCurrentApiUsage, getMaxAvailableApiUsage } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentApiUsage = await getCurrentApiUsage();
  const maxAvailableApi = await getMaxAvailableApiUsage();

  return (
    <div className="h-full relative">
      <div
        className="hidden h-full md:flex md:w-72
            md:flex-col md:fixed md:inset-y-0
            bg-gray-900"
      >
        <Sidebar
          currentApiUsage={currentApiUsage}
          maxAvailableApi={maxAvailableApi}
        />
      </div>
      <main className="md:pl-72">
        <Navbar
          currentApiUsage={currentApiUsage}
          maxAvailableApi={maxAvailableApi}
        />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
