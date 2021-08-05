import "./App.css";
import DNIExt from "./dni.png";
import { Fabric } from "./Fabric";

// const DNI = "https://thegenealogycorner.files.wordpress.com/2019/12/dni4.png";
// const Image = "https://images.unsplash.com/photo-1551361997-b3147f1942ea";

function App() {
  return (
    <div className="App">
      <Fabric imageUrl={DNIExt} />
    </div>
  );
}

export default App;
