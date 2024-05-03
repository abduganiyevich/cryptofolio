import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import style from './Modal.module.css';

function Modal({ isOpen, onClose }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);

  function handleDelete(index) {
    const updatedWatchlist = [...watchlist.slice(0, index), ...watchlist.slice(index + 1)];
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  }

  return (
    <div className={`${style.modal} ${isOpen ? style.open : ''}`}>
      <div className={style.content}>
        <button onClick={onClose} className={style.closeBtn}><IoMdClose  className={style['close-modal']}/></button>
        <h2 className={style['watchlist-title']}>Watchlist</h2>
        <div className={style.watchlistContainer}>
          {watchlist.map((item, index) => (
            <div key={index} className={style.watchlistItem}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>$ {item.current_price}</p>
              </div>
              <button onClick={() => handleDelete(index)} className={style.deleteBtn}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
