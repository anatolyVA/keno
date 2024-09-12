import backgroundImage from "./assets/background.jpg";
import { Game } from "./components/game.tsx";

function App() {
  return (
    <>
      <main
        className="min-h-screen object-cover bg-cover bg-center bg-no-repeat flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Game />
      </main>
    </>
  );
}

export default App;
