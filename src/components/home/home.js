import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // import navigate hook
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Home.module.css";
import Header from "../Header/Header";
import { CartContext } from "../CartContext/CartContext";
import DialogBox from "../AddToCartDialogBox/AddToCartDialogBox"; // import the dialog

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ productName: "", quantity: 1 });

  useEffect(() => {
    axios
      .get("/getProducts")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.productId] || 1;
    addToCart(product, qty);
    setDialogData({ productName: product.productName, quantity: qty });
    setDialogOpen(true);
  };

  const handleProductClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const featuredProducts = products.slice(0, 5);
  const newProducts = products.slice(-5);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className={styles.container}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Welcome to Grocery Store</h1>
        <p>Fresh, quality products delivered to your door</p>
      </section>

      {/* Featured Products */}
      <h2 className={styles.sectionTitle}>Featured Products</h2>
      <Slider {...settings} className={styles.carousel}>
        {featuredProducts.map((product) => (
          <div key={product.productId} className={styles.card}>
            <img
              src={`/${product.image}`}
              alt={product.productName}
              className={styles.productImage}
            />
            <h3
              className={styles.productName}
              onClick={() => handleProductClick(product)}
            >
              {product.productName}
            </h3>
            <p className={styles.price}>${product.price} / lb</p>
            <div className={styles.quantityBox}>
              <input
                type="number"
                min="1"
                value={quantities[product.productId] || 1}
                onChange={(e) =>
                  handleQuantityChange(product.productId, e.target.value)
                }
              />
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </Slider>

      {/* New Arrivals */}
      <h2 className={styles.sectionTitle}>New Arrivals</h2>
      <div className={styles.grid}>
        {newProducts.map((product) => (
          <div key={product.productId} className={styles.gridItem}>
            <img
              src={`/${product.image}`}
              alt={product.productName}
              className={styles.productImage}
            />
            <h3
              className={styles.productName}
              onClick={() => handleProductClick(product)}
            >
              {product.productName}
            </h3>
            <p className={styles.price}>${product.price}</p>
            <div className={styles.quantityBox}>
              <input
                type="number"
                min="1"
                value={quantities[product.productId] || 1}
                onChange={(e) =>
                  handleQuantityChange(product.productId, e.target.value)
                }
              />
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className={styles.addToCartButton}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Dialog Box */}
      <DialogBox
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        productName={dialogData.productName}
        quantity={dialogData.quantity}
      />
    </div>
  );
}

export default Home;