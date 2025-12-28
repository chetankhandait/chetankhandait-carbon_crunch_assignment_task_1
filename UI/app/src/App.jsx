import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedArt from './components/FeaturedArt';
import Gallery from './components/Gallery';
import Artists from './components/Artists';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <div className="background-gradients">
        <div className="gradient-1"></div>
        <div className="gradient-2"></div>
      </div>
      <Header />
      <main>
        <Hero />
        <FeaturedArt />
        <Gallery />
        <Artists />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

export default App;
