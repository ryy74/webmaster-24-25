import { useEffect, useState } from 'react';
import { FiGift, FiCheckCircle, FiX, FiShoppingCart } from 'react-icons/fi';

import { useAuth }  from '../../contexts/AuthContext';
import { useCart }  from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './Rewards.css';

const BASE = 'https://webmaster-backend-production.up.railway.app';

// Static menu items for rewards
const menuItems = [
  {
    id: 1,
    name: 'Vegan Tacos',
    price: 7.99,
    image: '/assets/menu-1-vegan-tacos.jpg',
  },
  {
    id: 2,
    name: 'Vegan Burrito',
    price: 9.49,
    image: '/assets/menu-2-vegan-burrito.jpg',
  },
  {
    id: 3,
    name: 'Vegan Salad',
    price: 11.29,
    image: '/assets/menu-3-vegan-salad.jpg',
  },
  {
    id: 4,
    name: 'Vegan Burger',
    price: 13.99,
    image: '/assets/menu-4-vegan-burger.jpg',
  },
  {
    id: 5,
    name: 'Vegan Pizza',
    price: 15.49,
    image: '/assets/menu-5-vegan-pizza.jpg',
  },
  {
    id: 6,
    name: 'Vegetarian Mac & Cheese',
    price: 6.49,
    image: '/assets/menu-6-vegetarian-mc.jpg',
  },
  {
    id: 7,
    name: 'Vegetarian Lasagna',
    price: 10.99,
    image: '/assets/menu-7-vegetarian-lasagna.jpg',
  },
  {
    id: 8,
    name: 'Vegan Curry',
    price: 8.99,
    image: '/assets/menu-8-vegan-curry.jpg',
  },
  {
    id: 9,
    name: 'Vegan Buddha Bowl',
    price: 10.49,
    image: '/assets/menu-9-vegan-bbowl.jpg',
  },
  {
    id: 10,
    name: 'Vegan Kabob',
    price: 6.49,
    image: '/assets/menu-10-vegan-kabob.jpg',
  },
  {
    id: 11,
    name: 'Vegan Stir Fry',
    price: 11.49,
    image: '/assets/menu-11-vegan-stirfry.jpg',
  },
  {
    id: 12,
    name: 'Vegan Sushi',
    price: 6.99,
    image: '/assets/menu-12-vegan-sushi.jpg',
  }
];

export default function Rewards() {
  const { user }      = useAuth();
  const { addItem }   = useCart();              
  const { t }         = useLanguage();

  const [catalog, setCatalog] = useState([]);   
  const [points,  setPoints]  = useState(0);
  const [loading, setLoading] = useState(true);
  const [err,     setErr]     = useState('');
  const [sel,     setSel]     = useState(null); 
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [rewardItems, setRewardItems] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);

  // Helper to get N random items from menu, excluding Custom Bowl
  function getRandomItems(arr, n) {
    const filtered = arr.filter(item => item.name !== 'Custom Bowl');
    const shuffled = filtered.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  // Initialize reward items only once
  useEffect(() => {
    const items = getRandomItems(menuItems, 12); // Get 12 items for all tiers
    setRewardItems(items);
  }, []);

  // Define reward tiers with menu items and gift cards
  const rewardTiers = [
    {
      points: 1000,
      label: '1000 Points',
      description: 'Choose one of these rewards:',
      items: rewardItems.slice(0, 3),
    },
    {
      points: 3000,
      label: '3000 Points',
      description: 'Choose one of these rewards or a $10 Gift Card:',
      items: [
        ...rewardItems.slice(3, 6),
        { id: 'gift-10', name: '$10 Gift Card', image: '/assets/giftcard-10.png' },
      ],
    },
    {
      points: 4000,
      label: '4000 Points',
      description: 'Choose one of these rewards or a $50 Gift Card:',
      items: [
        ...rewardItems.slice(6, 9),
        { id: 'gift-50', name: '$50 Gift Card', image: '/assets/giftcard-50.png' },
      ],
    },
    {
      points: 5000,
      label: '5000 Points',
      description: 'Choose one of these rewards or a $100 Gift Card:',
      items: [
        ...rewardItems.slice(9, 12),
        { id: 'gift-100', name: '$100 Gift Card', image: '/assets/giftcard-100.png' },
      ],
    },
  ];

  // Handle reward redemption
  const [redeeming, setRedeeming] = useState(false);
  const fetchPointsAndCatalog = async () => {
    try {
      const [catR, meR] = await Promise.all([
        fetch(`${BASE}/rewards`, { credentials:'include' }),
        fetch(`${BASE}/users/me`, {
          credentials:'include',
          headers:{ 'X-User': user.username },
        }),
      ]);
      setCatalog(await catR.json());
      setPoints((await meR.json()).Profile.points ?? 0);
    } catch {
      setErr(t('genericError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPointsAndCatalog();
  }, []);

  const handleRedeem = async (item, tierPoints) => {
    if (points < tierPoints || redeeming) return;
    setRedeeming(true);
    addItem({
      itemId: `reward-${item.id}`,
      name: item.name,
      price: 0,
      quantity: 1,
      rewardRedemption: true,
      image: item.image,
    });
    setPopupMessage(`${item.name} added to cart!`);
    setTimeout(() => setPopupMessage(null), 2000);
    await fetchPointsAndCatalog();
    setRedeeming(false);
  };

  if (loading) return <div className="rewards-wrapper">{t('processing')}…</div>;
  if (err)      return <div className="rewards-wrapper error">{err}</div>;

  return (
    <div className="rewards-wrapper">
      <header className="rw-head">
        <FiGift size={24}/>
        <h1>{t('rewardsStore')}</h1>
        <span className="points-tag">{points} pts</span>
      </header>

      <section className="rewards-progress-section" style={{ margin: '2.5rem 0', background: '#f8f8f8', borderRadius: '18px', padding: '3rem', boxShadow: '0 6px 32px rgba(0,0,0,0.07)' }}>
        <h2 style={{ marginBottom: '2rem', fontWeight: 800, fontSize: '2.2rem' }}>Your Rewards Progress</h2>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ background: '#eee', borderRadius: '14px', height: '32px', width: '100%', overflow: 'hidden' }}>
            <div style={{ background: '#4CAF50', width: `${Math.min(points / 5000 * 100, 100)}%`, height: '100%', borderRadius: '14px' }} />
          </div>
          <div style={{ textAlign: 'right', fontSize: '1.3rem', marginTop: '0.5rem', fontWeight: 600 }}>{points} / 5000 pts</div>
        </div>
        {rewardTiers.map(tier => (
          <div key={tier.points} style={{ marginBottom: '2.5rem', padding: '2rem', background: points >= tier.points ? '#e0ffe0' : '#f4f4f4', borderRadius: '14px', border: points >= tier.points ? '3px solid #4CAF50' : '2px solid #ccc', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#000' }}>{tier.label}</h3>
            <p style={{ margin: '0.7rem 0 1.3rem 0', fontSize: '1.1rem', color: '#000', fontWeight: 600 }}>{tier.description}</p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {tier.items.length === 0 ? <span style={{ color: '#888', fontSize: '1.1rem' }}>No items available</span> :
                tier.items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
                      padding: '1.2rem 1.5rem',
                      minWidth: '160px',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      cursor: points >= tier.points ? 'pointer' : 'not-allowed',
                      opacity: points >= tier.points ? 1 : 0.5,
                      border: points >= tier.points ? '3px solid #4CAF50' : '2px solid #ccc',
                      position: 'relative',
                    }}
                    onClick={() => points >= tier.points && handleRedeem(item, tier.points)}
                    title={points >= tier.points ? `Redeem for 0$ (${tier.points} pts)` : `Requires ${tier.points} pts`}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.7rem' }} />
                    <div style={{ fontWeight: 700, color: '#000' }}>{item.name}</div>
                    {showConfirmation === item.id && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(76, 175, 80, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                      }}>
                        Added to Cart!
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="rw-grid">
        {catalog.map(r => (
          <button
            key={r.id}
            className="gc-card"
            onClick={() => setSel(r)}
          >
            <img src={r.image} alt={r.name} />
            <div className="gc-info">
              <h3>{r.name}</h3>
              <p>{r.description}</p>
              <span className="gc-price">{r.price} pts</span>
            </div>
          </button>
        ))}
      </section>

      {sel && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSel(null)}>
              <FiX size={24} />
            </button>
            <img src={sel.image} alt={sel.name} />
            <div className="modal-info">
              <h2>{sel.name}</h2>
              <p>{sel.description}</p>
              <span className="modal-price">{sel.price} pts</span>
              <button
                className="redeem-button"
                onClick={() => handleRedeem(sel, sel.price)}
                disabled={points < sel.price}
              >
                {points >= sel.price ? 'Redeem' : `Need ${sel.price - points} more pts`}
              </button>
            </div>
          </div>
        </div>
      )}

      {popupMessage && (
        <div className="reward-popup-overlay">
          <div className="reward-popup-modal">
            <FiCheckCircle size={36} style={{ color: '#4CAF50', marginBottom: '1rem' }} />
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#222' }}>{popupMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
} 