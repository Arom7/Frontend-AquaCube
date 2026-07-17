import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { ConsumosPage } from "./pages/ConsumosPage";
import { HomePage } from "./pages/HomePage";
import { MedidoresPage } from "./pages/MedidoresPage";
import { PropiedadesPage } from "./pages/PropiedadesPage";
import { SociosPage } from "./pages/SociosPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "socios",
        element: <SociosPage />
      },
      {
        path: "propiedades",
        element: <PropiedadesPage />
      },
      {
        path: "medidores",
        element: <MedidoresPage />
      },
      {
        path: "consumos",
        element: <ConsumosPage />
      },
    ]
  }
]);
