import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import offers from "../../../TodayOffers.json";

const OfferDetails = () => {
  const { id } = useParams();
  const offer = offers.find((item) => Number(item.id) === Number(id));
  const [wishlist, setWishlist] = useState(false);

  if (!offer) {
    return <h2 className="text-center text-red-500 text-2xl mt-10">Offer Not Found</h2>;
  }

  // Toggle Wishlist
  const toggleWishlist = () => {
    setWishlist((prev) => !prev);
  };


  
      useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
      }, []);
    
     
    
      const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
        // Check if the product already exists in the cart
        const isProductInCart = cart.some((item) => item.description === product.description);
    
        if (isProductInCart) {
          alert(`"${product.description}" is already added in the cart!`);
          return;
        }
    
        // Auto-increment ID logic
        const newId = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;
    
        const newProduct = { ...product, id: newId };
        cart.push(newProduct);
    
        localStorage.setItem("cart", JSON.stringify(cart));
    
        window.dispatchEvent(new Event("cartUpdated"));
        alert(`"${product.description}" added successfully!`);
      };
    
      const addToWishlist = (product) => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
        // Check if the product is already in the wishlist
        const isProductInWishlist = wishlist.some((item) => item.description === product.description);
    
        if (isProductInWishlist) {
          alert(`"${product.description}" is already in your wishlist!`);
          return;
        }
    
        // Auto-increment ID logic
        const newId = wishlist.length > 0 ? wishlist[wishlist.length - 1].id + 1 : 1;
    
        const newProduct = { ...product, id: newId };
        wishlist.push(newProduct);
    
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    
        setWishlist(wishlist); // Update state
        window.dispatchEvent(new Event("wishlistUpdated"));
        alert(`"${product.description}" added to wishlist successfully!`);
      };
   
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow mt-10 relative">
      <h1 className="text-2xl font-bold mb-4">{ offer.description}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-80 flex justify-center items-center overflow-hidden">
          <img src={offer.imageUrl} alt={ offer.description} className="object-contain w-full h-full rounded-lg" />
        </div>
        <div>
          <p className="text-green-600 font-bold text-xl">{offer.discount} Off</p>
          <p className="text-green-600 font-bold text-xl">{offer.price} </p>
          <p className="text-gray-700 mt-2">{offer.description}</p>
          <div className="mt-4 flex space-x-2">
          <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(offer);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(offer);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                    >
                      Add to Wishlist
                    </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
