import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((acc, item) => acc + formatPrice(item.price), 0);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    updateCart();  // Initial load  
    window.addEventListener("storage", updateCart);
    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const handleDelete = (id) => {  // Cart ma thi item delete karva
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const formatPrice = (price) => {
    if (!price) return 30;
    return parseFloat(price.toString().replace("$", "")) || 0;
  };

  const handleOrderConfirm = () => {   // ✅ Order Confirmation
    alert("Order Confirmed!");
    localStorage.removeItem("cart"); // Clear cart after order
    setCartItems([]);
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/"); // Redirect to home or order success page
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      <h2 className="text-xl font-semibold mb-4">Add to Cart List</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Image</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={item.images?.[0] || item.imageUrl || item.url || "/default-image.jpg"}
                      alt={item.title}
                      className="w-12 h-12 rounded"
                    />
                  </td>

                  <td className="py-2 px-4 border-b">{item.title || item.description || item.name}</td>
                  <td className="py-2 px-4 border-b">${formatPrice(item.price).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (   //{/* ✅ Total Price & Order Button */}
        <div className="mt-6 p-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={handleOrderConfirm}
            className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      )}

    </div>
  );
};

export default AddToCart;
