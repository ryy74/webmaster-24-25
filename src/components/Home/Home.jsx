import farm from '../../assets/farm.jpg';
import produce from '../../assets/produce.jpg'
import vegan from '../../assets/vegan.jpg';
import homeBg from '../../assets/home-bg.jpg';
import sustainabilityBg from '../../assets/sustainability-bg.jpg'; 

import { menuItems } from './previewItems';

import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <img src={homeBg} alt="Green Bites Background" className="hero-background" />
        <div className="hero-content">
          <h1>Welcome to Green Bites!</h1>
          <p>Fresh, sustainable, and delicious vegan and vegetarian meals.</p>
          <a href="/menu" className="hero-cta">Explore Our Menu</a>
        </div>
      </div>

      <div className="about-section">
        <div className="about-image-grid">
          <img src={farm} alt="Farm" className="about-image" />
          <img src={produce} alt="Fresh Salad" className="about-image" />
          <img src={vegan} alt="Vegan Burger" className="about-image" />
        </div>
        <div className="about-content">
          <h2>Our Philosophy</h2>
          <p>
            At Green Bites, we believe in nourishing both body and soul. We source the freshest produce,
            celebrate seasonal ingredients, and craft plant-based dishes bursting with flavor.
            Every bite you take supports our local farmers, sustainability efforts, and a healthier planet.
          </p>
          <p>
            Join us in redefining the way we eat—one meal at a time.
          </p>
        </div>
      </div>

      <div 
        className="sustainability-section" 
        style={{ backgroundImage: `url(${sustainabilityBg})` }}
      >
        <div className="sustainability-content">
          <h2>Committed to Sustainability</h2>
          <p>
            From farm to table, we ensure that every ingredient is ethically sourced and minimally processed. 
            Our commitment to environmental stewardship goes hand-in-hand with our culinary creations. 
            Join us in our journey toward a greener, healthier future—one delicious meal at a time.
          </p>
        </div>
      </div>

      <div className="featured-section">
        <h2 className="section-heading">Featured Dishes</h2>
        <div className="preview-items">
          {menuItems.map((item) => (
            <div key={item.id} className="preview-item">
              <div className="image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="preview-item-image"
                />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>
              "The vegan tacos here are absolutely phenomenal! The combination of fresh ingredients and perfectly balanced flavors is unlike anything I've ever had. 
              Every bite is a burst of deliciousness that leaves you wanting more. I never thought plant-based food could be this satisfying."
            </p>
            <span>- Alex Johnson</span>
          </div>
          <div className="testimonial">
            <p>
              "Green Bites has completely redefined what it means to eat sustainably. Their dedication to supporting local farmers and using eco-friendly practices is truly admirable. 
              On top of that, the food is exceptional—every dish feels like a celebration of nature’s finest ingredients. I always leave with a happy heart and a full stomach."
            </p>
            <span>- Maria Smith</span>
          </div>
          <div className="testimonial">
            <p>
              "I was skeptical about plant-based meals until I tried Green Bites. Their dishes are an absolute revelation! The creativity in their recipes and the boldness of the flavors are unmatched. 
              It’s amazing to see how they turn simple, wholesome ingredients into culinary masterpieces. Highly recommend to anyone, vegan or not!"
            </p>
            <span>- David Lee</span>
          </div>
        </div>
        <p className="testimonial-disclaimer">
          Disclaimer: These people do not exist, and these quotes were created purely for contest purposes.
        </p>
      </div>

      <div className="banner-section">
        <h2>Ready to Experience the Difference?</h2>
        <p>Visit us or order online today and taste what nature has to offer.</p>
        <a href="/signin" className="banner-cta">Order Now</a>
      </div>
    </div>
  );
};

export default Home;
