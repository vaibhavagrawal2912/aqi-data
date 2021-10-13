import "./App.css";
import useWebSocketData from "./hooks/useWebSocketData";
import TableComponent from "./components/TableComponent";
import ErrorComponent from "./components/ErrorComponent";

function App() {
  const { aqiData, errorData } = useWebSocketData();
  return (
    <div className="App">
      <section className="container">
        {errorData?.isError ?
          (
            <ErrorComponent />
          ) :
          (
            <TableComponent data={aqiData} />
          )
        }
      </section>
    </div>
  );
}

export default App;
