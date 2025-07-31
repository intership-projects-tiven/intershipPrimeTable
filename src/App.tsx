import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
const Table = lazy(() => import("./components/Table"));

const queryclient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <Suspense fallback={<h2 className="text-2xl">Loading...</h2>}>
          <Table />
        </Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
