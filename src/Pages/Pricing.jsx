import React, { useState } from 'react';

const plans = [
  { id: 1, name: 'Standard', price: '$10/month', features: ['Feature 1', 'Feature 2'] },
  { id: 2, name: 'Premium', price: '$20/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
  { id: 3, name: 'Enterprise', price: '$30/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
];

const PricingPage = () => {
  const [formData, setFormData] = useState({ name: '', age: '', location: '', selectedPlan: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., send to an API)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>Pricing Plans</h1>
      <div className="pricing-table">
        {plans.map(plan => (
          <div key={plan.id} className="plan">
            <h2>{plan.name}</h2>
            <p>{plan.price}</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => setFormData({ ...formData, selectedPlan: plan.name })}>
              Select {plan.name}
            </button>
          </div>
        ))}
      </div>

      <h2>Purchase Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Your Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Purchase {formData.selectedPlan}</button>
      </form>
    </div>
  );
};

export default PricingPage;