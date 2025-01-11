import Navbar from "@ui/navbar";
import Sidebar from "@ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <hr className="h-[2px]"/>
      {/* <div className='flex '>
        <div className='hidden md:block w-[400px]'>
          <Sidebar />
        </div>
        <div className='flex-1 p-5'>{children}</div>
      </div> */}
      <div className='h-screen flex'>
          {/* LEFT */}
        <div className="w-[20%] md:w-[11%] lg:w-[22%] xl:w-[20%] bg-primary">
          <Sidebar />
        </div>
        {/* RIGHT */}
        <div className="w-[80%] md:w-[89%] lg:w-[78%] xl:w-[80%] flex-1 p-5 overflow-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
