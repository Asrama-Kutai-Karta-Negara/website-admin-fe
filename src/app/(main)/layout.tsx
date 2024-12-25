import Navbar from "@ui/navbar";
import Sidebar from "@ui/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <hr className="h-[2px]"/>
      <div className='flex '>
        <div className='hidden md:block w-[400px]'>
          <Sidebar />
        </div>
        <div className='flex-1 p-5'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
