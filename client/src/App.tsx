import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Cart, Product } from "./interface";
import {addProductToCart,getCarts,getProducts,removeCartProduct,updateCartProduct} from "./store/reducers/productReducer";

export default function App() {
  const products: Product[] = useSelector(
    (state: any) => state.product.products
  );
  const carts: Cart[] = useSelector((state: any) => state.product.carts);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCarts());
  }, [dispatch]);

  const handleAddProductToCart = (product: Product) => {
    if (product.stock_quantity > 0) {
      const cartItem: Cart = {
        id: 0,
        product,
        quantity: 1,
      };
      dispatch(addProductToCart(cartItem));
    }
  };

  const handleUpdateCartProduct = (cart: Cart, quantity: number) => {
    if (quantity <= cart.product.stock_quantity + cart.quantity) {
      const updatedCart = { ...cart, quantity };
      dispatch(updateCartProduct(updatedCart));
    }
  };

  const handleRemoveCartProduct = (id: number) => {
    dispatch(removeCartProduct(id));
  };

  const calculateTotal = () => {
    return carts.reduce(
      (total, cart) => total + cart.product.price * cart.quantity,
      0
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>List Product</h3>
            {products.map((product) => (
              <div key={product.id} className="d-flex gap-2 border p-2 mb-3">
                <div>
                  <img
                    src={product.image}
                    className="img-fluid"
                    style={{ width: "120px", height: "120px" }}
                    alt=""
                  />
                </div>
                <div style={{ width: "275px" }}>
                  <b>{product.productName}</b>
                  <p className="w-75">{product.description}</p>
                  <b>Total: {product.stock_quantity}</b>
                </div>
                <div>
                  <input
                    style={{ width: "105px" }}
                    type="text"
                    value={quantity[product.id] || ""}
                    onChange={(e) =>
                      setQuantity({
                        ...quantity,
                        [product.id]: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <p>Price: ${product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddProductToCart(product)}
                    disabled={product.stock_quantity <= 0}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col">
            <h3>Shopping Cart</h3>
            {carts.map((cart) => (
              <div
                key={cart.id}
                className="d-flex justify-content-between p-3 border-bottom"
              >
                <div className="d-flex gap-3">
                  <img
                    src={cart.product.image}
                    className="img-fluid"
                    style={{ width: "120px", height: "120px" }}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <b>{cart.product.productName}</b>
                    <input
                      style={{ width: "70px" }}
                      type="text"
                      value={cart.quantity}
                      onChange={(e) =>
                        handleUpdateCartProduct(
                          cart,
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <p>Quantity: {cart.quantity}</p>
                  </div>
                </div>
                <div>
                  <div className="d-flex flex-column">
                    <b className="text-end">
                      ${cart.product.price * cart.quantity}
                    </b>
                    <button
                      className="btn btn-light"
                      onClick={() =>
                        handleUpdateCartProduct(cart, cart.quantity)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn text-primary fw-semibold"
                      onClick={() => handleRemoveCartProduct(cart.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between p-3">
              <b>Subtotal</b>
              <b>${calculateTotal()}</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}