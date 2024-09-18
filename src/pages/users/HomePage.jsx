import Layout from "../../Layout";

export default function HomePage() {
  function content() {
    return (
      <div>
        <section class="hero">
          <h1>Your Everyday Freshness, Always Within Reach</h1>
        </section>

        <section class="content">
          <h2>About Us</h2>
          <p>
            Welcome to our supermarket! We are committed to bringing you the
            freshest and highest-quality products at affordable prices. Explore
            our wide range of items and enjoy a convenient shopping experience.
          </p>
        </section>
      </div>
    );
  }
  return <Layout component={content()} />;
}
