import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { ProductList } from './pages/ProductList';
import { AddProduct } from './pages/AddProduct';
import { EditProduct } from './pages/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
        <Toaster position="top-right" />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
