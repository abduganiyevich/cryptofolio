
import React from 'react';
import Header from '../Header/Header';
import error from '../../assets/404.png'
import bot from '../../assets/bots.png'
import style from '../ErrorPage/Error.module.css'
import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className={style['error-wrapper']}>

          <div className={style['err-info']}>
            <img src={error} alt="" />
            <h2>Error 404: Page Not Found</h2>
            <p>something is wrong please return to the main page</p>
            <FaArrowDownLong className={style['err-arrow']}/>
            <Link to={'/'} className={style['redirect-btn']}>Main page</Link>
          </div>

          <div className={style['err-img']}>
            <img src={bot} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
