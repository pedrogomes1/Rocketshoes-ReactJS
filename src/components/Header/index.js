import React from 'react';

import {Link} from 'react-router-dom';

import { MdShoppingBasket } from 'react-icons/md'

import { Container, Cart } from './styles';

import { useSelector } from 'react-redux';

import logo from '../../assets/logo.svg'

export default function Header() {

  const cartSize = useSelector(state => state.cart.length)
  
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes"/>
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartSize}</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />

      </Cart>
    </Container>
  );
}