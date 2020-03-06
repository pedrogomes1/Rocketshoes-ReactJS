import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductsTable, Total  } from './styles';
import * as CartActions from '../../store/modules/cart/actions'
import {formatPrice} from '../../util/format'

export default function Cart() {

//Toda vez que precisar acessar uma informação do estado do Redux, usa o useSelector
//Toda vez que precisar disparar uma action do redux, usa o dispatch
  const total = useSelector(state => formatPrice(state.cart.reduce((totalSum, product) => {
    return (totalSum + product.price * product.amount)
  }, 0)))

  const cart = useSelector(state => state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount)
  })))

  const dispatch = useDispatch()

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount+1))
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount-1))
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
                <MdDelete size={20} color="#7159c1" onClick={() => dispatch(CartActions.removeToCart(product.id))} />
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