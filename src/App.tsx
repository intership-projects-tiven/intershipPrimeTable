import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Table from "./components/Table";

const queryclient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryclient}>

        <Table />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
