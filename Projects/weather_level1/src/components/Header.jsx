import logo from "../assets/images/wsa-logo.svg";
export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="wsa-logo" width={183} height={63} />
      <h1 className="header-text">WEATHER</h1>
    </div>
  );
}
