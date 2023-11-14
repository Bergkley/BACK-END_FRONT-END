type MenuOptions = "" | "Funcionarios" | "Setor" | "Clientes" | "Contato";

export const createMenuObject = (activeMenu: MenuOptions) => {
  let returnObject = {
    Funcionarios: false,
    Setor: false,
    Clientes: false,
    Contato:false,
  };

  if (activeMenu !== "") {
    returnObject[activeMenu] = true;
  }

  return returnObject;
};