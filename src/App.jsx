import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/authcontext";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Login from './views/Login'
import Encabezado from "./components/Encabezado";
import Inicio from "./views/Inicio";
import Categorias from "./views/Categorias";
import Productos from "./views/Productos";
import Catalogo from "./views/Catalogo";
import Libros from "./views/Libros";
import Clima from "./views/Clima";
import Pronunciacion from "./views/Pronunciacion";
import Estadisticas from "./views/Estadisticas";
import Empleados from "./views/Empleados";
import './App.css'


function App() {
  return (
    <AuthProvider>
      <Router>
          <Encabezado />
          <main className="margen-superior-main">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
              <Route path="/categorias" element={<ProtectedRoute element={<Categorias />} />}/>
              <Route path="/productos" element={<ProtectedRoute element={<Productos />} />}/>
              <Route path="/Catalogo" element={<ProtectedRoute element={<Catalogo />} />}/>
              <Route path="/Libros" element={<ProtectedRoute element={<Libros />} />}/>
              <Route path="/Clima" element={<ProtectedRoute element={<Clima />} />}/>
              <Route path="/Pronunciacion" element={<ProtectedRoute element={<Pronunciacion />} />}/>
              <Route path="/Estadisticas" element={<ProtectedRoute element={<Estadisticas />} />}/>
              <Route path="/Empleados" element={<ProtectedRoute element={<Empleados />} />}/>
            </Routes>
          </main>
      </Router>
    </AuthProvider>
  )
}

export default App;