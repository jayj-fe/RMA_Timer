import { Route, Routes } from 'react-router-dom';
import PageRmaTimer from './pages/PageRmaTimer'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<PageRmaTimer />}></Route>
          <Route path="/Rma_Timer" element={<PageRmaTimer />}></Route>
          <Route path="/RMA_Timer" element={<PageRmaTimer />}></Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
