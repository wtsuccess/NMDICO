import Header from "./components/Header";
import Presale from "./pages/Presale";

function App() {
  return (
    <div className="font-[poppinsbold]  h-screen bg-amber-600 flex flex-col">
      <Header />
      <main className="flex justify-center items-center flex-1">
        <Presale />
      </main>
    </div>
  );
}

export default App;
