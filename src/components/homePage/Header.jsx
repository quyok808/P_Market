import bannerimg from "../../../public/assets/banner.gif";
export default function Header() {
  return (
    <header>
      {/* <h1>Welcome to P's Market</h1> */}
      <img src={bannerimg} alt="banner" className="banner-image" />
    </header>
  );
}
