import React from 'react';

import {Link} from 'react-router-dom';

import { MdShoppingBasket } from 'react-icons/md'

import { Container, Cart } from './styles';

import { connect } from 'react-redux';

import logo from '../../assets/logo.svg'

function Header( { cartSize }) {
  
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

//Recebo as propriedades de outro componente
//state.cart .. esse cart é o nome do meu reducer .. vejo lá em rootReducer
export default connect(state => ({
  cartSize:state.cart.length,
}))(Header)