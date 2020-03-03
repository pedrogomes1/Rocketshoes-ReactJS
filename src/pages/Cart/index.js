import React from 'react';
import { connect } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductsTable, Total  } from './styles';
import {bindActionCreators}from 'redux';
import * as CartActions from '../../store/modules/cart/actions'
import {formatPrice} from '../../util/format'

function Cart({ cart, total, removeToCart, updateAmountRequest }) {

  function increment(product) {
    updateAmountRequest(product.id, product.amount+1)
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount-1)
  }
  return (
    <Container>
      <ProductsTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Qtd</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
            <td>
              <img src={product.image} alt={product.title}/>
            </td>

            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>

            <td>
              <div>
                <button type="button" onClick={() => decrement(product)}>
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button" onClick={() => increment(product)}>
                  <MdAddCircleOutline size={20} color="#7159c1"/>
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subTotal}</strong>
            </td>

            <td>
              <button type="button">
                <MdDelete size={20} color="#7159c1" onClick={() => removeToCart(product.id)} />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </ProductsTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL: </span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
//Vai pegar info do estado e mapear em formato de props do componente
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount)
  })),
  //Reduce: reduzo um array e pego um único valor
  total: formatPrice(state.cart.reduce((total, product) => {
    return (total + product.price * product.amount)
  }, 0))
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart)