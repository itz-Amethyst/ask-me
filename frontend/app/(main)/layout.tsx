import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		// <div className="h-full relative">
		// 	<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900 border-r-2">
		// 		<Sidebar />
		// 	</div>
		// 	<main className="md:pl-72 pb-10">
		// 		<Navbar />
		// 		{children}
		// 	</main>
		// </div>
		<div className="flex w-screen h-screen text-gray-700">
      <Navbar/>
      <Sidebar/>
      
      <div className="flex flex-col flex-grow">
        <div className="flex items-center flex-shrink-0 h-16 bg-white border-b border-gray-300 px-4">
          <div>
            <h1 className="text-sm font-bold leading-none">#council-of-elrond</h1>
            <span className="text-xs leading-none">Lets sort this ring thing out hey!?!</span>
          </div>
        </div>
        
        {children}
        {/* Input */}
        
      </div>

    </div>
	);
};

export default DashboardLayout;
