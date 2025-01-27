import './CartItem.css';

function CartItem({ item, quantity, onChangeQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <img className="cart-item-image" src={item.image} alt={item.name} />
        <div className="cart-item-details">
          <h3 className="cart-item-name">{item.name}</h3>
          <p className="cart-item-description">{item.description}</p>
        </div>
      </div>
      <div className="cart-item-right">
        <button
          className="cart-item-remove"
          onClick={() => onRemove(item.id)}
          title="Remove Item"
        >
          🗑
        </button>
        <select
          className="cart-item-quantity"
          value={quantity}
          onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value))}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option value={i} key={i}>
              {i}
            </option>
          ))}
        </select>
        <p className="cart-item-price">${(item.price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartItem;
