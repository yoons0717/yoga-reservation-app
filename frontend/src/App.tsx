import {testAPI} from "./api";
import "./App.css";

function App() {
  const handleClick = async () => {
    try {
      const res = await testAPI();
      alert(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Yoga Flow App</h1>
      <button
        onClick={handleClick}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Test Backend Connection
      </button>
    </div>
  );
}

export default App;
