import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import Footer from "../../../../modules/footer/Footer";
import categories from "./Categories";

const AmazonProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");

    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [location]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const isProductInCart = cart.some((item) => item.title === product.title);

    if (isProductInCart) {
      alert(`"${product.title}" is already added in the cart!`);
      return;
    }

    // Auto-increment ID logic
    const newId = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;

    const newProduct = { ...product, id: newId };
    cart.push(newProduct);

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
    alert(`"${product.title}" added successfully!`);
  };

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if the product is already in the wishlist
    const isProductInWishlist = wishlist.some((item) => item.title === product.title);

    if (isProductInWishlist) {
      alert(`"${product.title}" is already in your wishlist!`);
      return;
    }

    // Auto-increment ID logic
    const newId = wishlist.length > 0 ? wishlist[wishlist.length - 1].id + 1 : 1;

    const newProduct = { ...product, id: newId };
    wishlist.push(newProduct);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    setWishlist(wishlist); // Update state
    window.dispatchEvent(new Event("wishlistUpdated"));
    alert(`"${product.title}" added to wishlist successfully!`);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleProductClick = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "/product-detail"; // Redirect to detail page
  };

  return (
    <>
      <div className="container mx-auto p-4">
        {selectedCategory && categories[selectedCategory] ? (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2 capitalize">{selectedCategory.replace("-", " ")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories[selectedCategory].map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow relative cursor-pointer"
                  onClick={() => handleProductClick(product)} // Click to view details
                >
                  <button
                    className="absolute top-2 right-2 text-2xl focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      wishlist.some((item) => item.id === product.id)
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product);
                    }}
                  >
                    {wishlist.some((item) => item.id === product.id) ? "❤️" : "🤍"}
                  </button>
                  <div className="w-64 h-64 flex justify-center items-center overflow-hidden">
                    <img src={product.images[0] } alt={product.title} className="object-contain w-full h-full rounded-lg" />
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
                  <p className="text-green-600 font-bold">{product.price}</p>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill={i < product.rating ? "#FFD700" : "#E5E7EB"} />
                    ))}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Please select a category to view products.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AmazonProductPage;
