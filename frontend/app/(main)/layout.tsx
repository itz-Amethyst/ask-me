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
        <div className="flex flex-col flex-grow overflow-auto">
          <div className="flex px-4 py-3">
            <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
            <div className="ml-2">
              <div className="-mt-1">
                <span className="text-sm font-semibold">Sam</span>
                <span className="ml-1 text-xs text-gray-500">01:26</span>
              </div>
              <p className="text-sm">Anyone know if Frodo is awake yet?</p>
              <div className="flex space-x-2 mt-1">
                <button className="flex items-center pl-1 pr-2 h-5 bg-gray-300 hover:bg-gray-400 rounded-full text-xs">
                  <span>🤷</span>
                  <span className="ml-1 font-medium">2</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-2">

          </div>
          <div className="flex px-4 py-3">
            <div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300"></div>
            <div className="ml-2">
              <div className="-mt-1">
                <span className="text-sm font-semibold">Elrond</span>
                <span className="ml-1 text-xs text-gray-500">01:26</span>
              </div>
              <p className="text-sm">Strangers from distant lands, friends of old. You have been summoned here to answer the threat of Mordor. Middle-Earth stands upon the brink of destruction. None can escape it. You will unite or you will fall. Each race is bound to this fate–this one doom. (gestures to the pedestal) Bring forth the Ring, Frodo.</p>

            </div>
          </div>

        </div>
        {/* Input */}
        
      </div>

    </div>
	);
};

export default DashboardLayout;
