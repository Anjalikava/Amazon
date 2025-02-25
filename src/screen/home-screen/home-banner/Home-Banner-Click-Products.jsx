import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const HomeBannerClickProducts = () => {
    const location = useLocation();
    const selectedProduct = location.state?.product || null;
    const [wishlist, setWishlist] = useState({});

    if (!selectedProduct) {
        return <p className="text-center text-red-500">No product data available.</p>;
    }

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
        setWishlist(storedWishlist);
    }, []);
    const toggleWishlist = () => {
        setWishlist((prev) => !prev);
      };
    
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const isProductInCart = cart.some((item) => item.name === product.name);

        if (isProductInCart) {
            alert(`"${product.name}" is already in the cart!`);
            return;
        }

        const newId = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;
        const newProduct = { ...product, id: newId };
        cart.push(newProduct);

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        alert(`"${product.name}" added successfully!`);
    };

    const addToWishlist = (product) => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isProductInWishlist = wishlist.some((item) => item.name === product.name);

        if (isProductInWishlist) {
            alert(`"${product.name}" is already in your wishlist!`);
            return;
        }

        const newId = wishlist.length > 0 ? wishlist[wishlist.length - 1].id + 1 : 1;
        const newProduct = { ...product, id: newId };
        wishlist.push(newProduct);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setWishlist(wishlist);
        window.dispatchEvent(new Event("wishlistUpdated"));
        alert(`"${product.name}" added to wishlist successfully!`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow mt-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">{selectedProduct.itemTitle}</h1>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {selectedProduct.imgs.map((img, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow flex flex-col items-center relative">
                        <button
                            className="absolute top-2 right-2 text-2xl focus:outline-none"
                            onClick={() => toggleWishlist(index)}
                        >
                            {wishlist[index] ? "❤️" : "🤍"}
                        </button>

                        <img src={img.url} alt={img.name} className="object-contain w-40 h-40 rounded-lg shadow" />
                        <p className="text-sm text-gray-700 mt-2 font-bold">{img.name}</p>
                        <p className="text-green-600 text-sm font-bold">{img.Price || "$30"}</p>

                        <div className="mt-2 flex space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(img);
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToWishlist(img);
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
    );
};

export default HomeBannerClickProducts;
