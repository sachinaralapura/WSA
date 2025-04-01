import Copyright from "./Copyright";
import Header from "./Header";
function MainLayout({ showHeader = true, children }) {
  return (
    <div className="layout-container-div">
      {showHeader && <Header />}
      {children}
      <Copyright />
    </div>
  );
}

export default MainLayout;
