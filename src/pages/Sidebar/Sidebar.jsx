import s from "./Sidebar.module.scss";

const Sidebar = ({ children }) => {
  return <div className={s.sidebar}>{children}</div>;
};

export default Sidebar;