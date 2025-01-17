import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firebase Firestore
import { getAuth } from "firebase/auth"; // Firebase Authentication
import "./HostingPlans.css"; // Your CSS file

const Pricing = () => {
  const [formData, setFormData] = useState({
    plan: "free",
    username: "",  // 'username' should match the form input's name
    age: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const db = getFirestore(); // Initialize Firestore
  const navigate = useNavigate(); // Initialize navigate

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // Redirect to login if the user is not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Destructure 'name' and 'value'
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  // Update the form field dynamically based on 'name'
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset any previous error

    try {
      console.log("Form data to be saved:", formData);

      // Save to Firestore
      await addDoc(collection(db, "purchases"), {
        username: formData.username,
        age: parseInt(formData.age, 10),
        location: formData.location,
        plan: formData.plan,
      });

      alert(`Thank you for purchasing the ${formData.plan} plan, ${formData.username}!`);
      setFormData({ plan: "free", username: "", age: "", location: "" });
      navigate("/blog");
    } catch (error) {
      setError("Failed to save your purchase. Please try again.");
      console.error("Error saving purchase data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hosting-container w-full min-h-screen p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Our Hosting Plans</h1>
      </header>

      <section className="pricing flex flex-wrap justify-center gap-8 mb-8">
        <div className="plan w-full sm:w-1/3 p-4 border rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-xl mb-2">₦0 / month</p>
          <ul className="text-left">
            <li>1 Website</li>
            <li>500MB Storage</li>
            <li>Basic Support</li>
          </ul>
        </div>
        <div className="plan w-full sm:w-1/3 p-4 border rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">Premium</h2>
          <p className="text-xl mb-2">₦35000 / month</p>
          <ul className="text-left">
            <li>5 Websites</li>
            <li>50GB Storage</li>
            <li>Priority Support</li>
          </ul>
        </div>
        <div className="plan w-full sm:w-1/3 p-4 border rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
          <p className="text-xl mb-2">₦99000 / month</p>
          <ul className="text-left">
            <li>Unlimited Websites</li>
            <li>Unlimited Storage</li>
            <li>Dedicated Support</li>
          </ul>
        </div>
      </section>

      <section className="purchase-form max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Purchase Your Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="plan" className="block text-lg">Select Plan:</label>
          <select
            id="plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>

          <label htmlFor="username" className="block text-lg">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <label htmlFor="age" className="block text-lg">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Your Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <label htmlFor="location" className="block text-lg">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Your Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Purchase Plan"}
          </button>
        </form>
        {error && <div className="error-message text-red-500 text-center mt-4">{error}</div>}
      </section>
    </div>
  );
};

export default Pricing;
