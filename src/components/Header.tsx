import { useContext, useEffect, useState } from "react";
import logo from "../assets/svg/logo.svg";
import UserContext from "../state/user/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const routes = [
  {
    name: "receitas",
    path: "/receitas",
    icon: "menu_book",
    loggedIn: false,
  },
  {
    name: "minhas receitas",
    path: "/receitas/minhas",
    icon: "local_library",
    loggedIn: true,
  },
  {
    name: "criar receita",
    path: "/receitas/criar",
    icon: "bookmark_manager",
    loggedIn: true,
  },
];

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const escapeFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", escapeFunction);

    return () => {
      document.removeEventListener("keydown", escapeFunction);
    };
  }, [isSidebarOpen]);

  function logout() {
    const confirm = window.confirm("atenção! deseja mesmo sair?");
    if (!confirm) return;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(undefined);
    navigate("/");
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <header className="z-20 fixed flex justify-between items-center h-16 w-full px-6 border-solid bg-background border-primary border-b-2">
        <button
          onClick={toggleSidebar}
          title="abrir menu"
          className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
        >
          <i className="material-symbols-outlined">menu</i>
        </button>
        <img
          className="h-8 w-100 mx-auto cursor-pointer"
          src={logo}
          onClick={() => {
            navigate("/receitas");
          }}
          alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')"
        />
        {user ? (
          <button
            onClick={logout}
            title="sair"
            className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
          >
            <i className="material-symbols-outlined">logout</i>
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/entrar");
            }}
            title="entrar"
            className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
          >
            <i className="material-symbols-outlined">login</i>
          </button>
        )}
      </header>
      <aside
        className={`fixed flex flex-col top-0 left-0 h-screen w-full transform transition-transform duration-200 ease-out z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={toggleSidebar}
      >
        <section
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-background w-full h-full md:w-96 md:border-solid md:border-primary md:border-r-2 flex flex-col p-4 gap-4"
        >
          {user && (
            <>
              <div className="flex gap-2 items-center justify-between">
                <span className="md:hidden material-symbols-outlined text-3xl">
                  face
                </span>
                <h3 className="font-display font-bold text-2xl line-clamp-1">
                  {user?.name}
                </h3>
                <button
                  onClick={toggleSidebar}
                  title="fechar menu"
                  className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center transition-all"
                >
                  <i className="material-symbols-outlined">close</i>
                </button>
              </div>
              <div className="w-full h-0.5 bg-primary"></div>
            </>
          )}
          <ul className="flex flex-col gap-2">
            {routes.map((route) => {
              if (route.loggedIn && !user) return null;

              return (
                <li key={route.path} className="flex gap-4 items-center">
                  <NavLink
                    className={({ isActive }) => `
                ${
                  isActive
                    ? "font-bold border-b-primary border-b-2"
                    : "font-normal hover:opacity-80 active:opacity-70 hover:border-b-2 hover:border-primary"
                }
                border-b-2 border-transparent flex font-display font-bold text-xl line-clamp-1 h-12 items-center justify-start w-full gap-2 transition-all
              `}
                    to={route.path}
                    end
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {route.icon}
                    </span>
                    <span className="leading-none">{route.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>
    </>
  );
}
