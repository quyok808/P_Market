import Footer from "./components/homePage/Footer";
import Header from "./components/homePage/Header";
import Menu from "./components/homePage/Menu";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <Menu />
      {props.component}
      <Footer />
    </div>
  );
}
