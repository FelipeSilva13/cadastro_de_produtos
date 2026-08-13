import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { ProductList } from './pages/ProductList';
import { AddProduct } from './pages/AddProduct';
import { EditProduct } from './pages/EditProduct';
import { Customers } from './pages/Customers';
import { Sales } from './pages/Sales';
import { Orders } from './pages/Orders';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/clientes" element={<Customers />} />
          <Route path="/vendas" element={<Sales />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster position="top-right" />
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
