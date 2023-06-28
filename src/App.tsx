import Footer from "./components/Footer";
import Header from "./components/Header";
import Presale from "./pages/Presale";

function App() {
  return (
    <div className="font-[poppinsbold] h-screen bg-orange-400  flex flex-col ">
      <Header />
      <main className="flex justify-center items-center flex-1 relative">
        <img src="/images/PM.png" alt="" className="absolute w-[250px] h-[300px], right-[100px] bottom-[-10px] hidden md:block"/>
        <Presale />
      </main>
      <Footer />
    </div>
  );
}

export default App;
