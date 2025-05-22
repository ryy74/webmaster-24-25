import { useEffect, useState } from 'react';
import {
  FiGift,
  FiCheckCircle,
  FiX,
  FiShoppingCart,
} from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

import './Rewards.css';

const BASE = 'https://webmaster-backend-production.up.railway.app';

export default function Rewards() {
  const { user } = useAuth();
  const { addItem } = useCart();         // must exist in your CartContext
  const { t } = useLanguage();

  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [sel, setSel] = useState(null);  // reward obj selected
  const [points, setPoints] = useState(0);

  // fetch catalog & balance
  useEffect(() => {
    const run = async () => {
      try {
        const [catR, meR] = await Promise.all([
          fetch(`${BASE}/rewards`, { credentials: 'include' }),
          fetch(`${BASE}/users/me`, {
            credentials: 'include',
            headers: { 'X-User': user.username },
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
    run();
    // eslint-disable-next-line
  }, []);

  const handleAddToCart = () => {
    if (!sel) return;
    addItem({
      itemId: `gc-${sel.id}`,   // synthetic id
      name: sel.name,
      price: Number(sel.name.match(/\$(\d+)/)[1]), // $25 → 25
      quantity: 1,
      meta: { rewardId: sel.id },                  // so checkout knows
    });
    setSel(null);
  };

  /* ------------------------- ui ---------------------- */
  if (loading) return <div className="rewards-wrapper">{t('processing')}…</div>;
  if (err)      return <div className="rewards-wrapper error">{err}</div>;

  return (
    <div className="rewards-wrapper">
      <header className="rw-head">
        <FiGift size={24} />
        <h1>{t('rewardsStore')}</h1>
        <span className="points-tag">{points} pts</span>
      </header>

      <section className="rw-grid">
        {catalog.map((r) => (
          <button
            key={r.id}
            className="gc-card"
            onClick={() => setSel(r)}
          >
            <span className="gc-name">{r.name}</span>
            <span className="gc-cost">{r.cost} pts</span>
          </button>
        ))}
      </section>

      {/* ---------- modal ---------- */}
      {sel && (
        <div className="modal-back" onClick={() => setSel(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSel(null)}>
              <FiX />
            </button>
            <FiCheckCircle size={40} className="icon" />
            <h2>{t('confirmAdd')}</h2>
            <p>
              {t('wantToAdd')} <strong>{sel.name}</strong>{' '}
              {t('toCart')}?
            </p>
            <button className="confirm-btn" onClick={handleAddToCart}>
              <FiShoppingCart /> {t('add')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
