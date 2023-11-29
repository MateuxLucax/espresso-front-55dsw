import { useContext, useState } from "react";
import logo from "../assets/svg/logo.svg";
import UserContext from "../state/user/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const routes = [
  {
    name: "me",
    path: "/me",
    icon: "face",
  },
  {
    name: "receitas",
    path: "/receitas",
    icon: "menu_book",
  },
  {
    name: "favoritos",
    path: "/favoritos",
    icon: "bookmarks",
  },
  {
    name: "criar receita",
    path: "/receitas/criar",
    icon: "bookmark_manager",
  },
];

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    const confirm = window.confirm("atenção! deseja mesmo sair?");
    if (!confirm) return;

    localStorage.removeItem("user");
    setUser(undefined);
    navigate("/");
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <header className="fixed flex justify-between items-center h-16 w-full px-4 border-solid border-primary border-b-2">
        <button
          onClick={toggleSidebar}
          title="abrir menu"
          className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center"
        >
          <i className="material-symbols-outlined">menu</i>
        </button>
        <img
          className="h-8 w-100 mx-auto"
          src={logo}
          alt="logo do espresso (uma xícara de café ao lado do texto 'espresso')"
        />
        <button
          onClick={logout}
          title="sair"
          className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center"
        >
          <i className="material-symbols-outlined">logout</i>
        </button>
      </header>
      <aside
        className={`fixed flex flex-col top-0 left-0 h-screen w-full z-10 transform transition-transform duration-200 ease-out ${
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
          <div className="flex gap-2 items-center">
            <span className="hidden sm:flex material-symbols-outlined text-3xl">
              face
            </span>
            <h3 className="font-display font-bold text-2xl line-clamp-1">
              {user?.name}
            </h3>
            <button
              onClick={toggleSidebar}
              title="fechar menu"
              className="h-12 w-12 hover:opacity-80 active:opacity-70 flex justify-center items-center"
            >
              <i className="material-symbols-outlined">close</i>
            </button>
          </div>
          <div className="w-full h-0.5 bg-primary"></div>
          <ul className="flex flex-col gap-2">
            {routes.map((route) => (
              <li className="flex gap-4 items-center">
                <NavLink
                  className={({ isActive }) => `
                ${
                  isActive
                    ? "font-bold border-b-primary border-b-2"
                    : "font-normal hover:opacity-80 active:opacity-70"
                }
                flex font-display font-bold text-xl line-clamp-1 h-12 items-center justify-start w-full gap-2
              `}
                  to={route.path}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {route.icon}
                  </span>
                  <span className="leading-none">{route.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  );
}

export default Header;
