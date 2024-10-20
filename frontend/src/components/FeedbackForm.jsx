import { useState } from "react";
import "./FeedbackForm.css"; // Import your CSS file
// import { FaUser } from "react-icons/fa";

const FeedbackForm = () => {
  const [feedbackFormData, setFeedbackFormData] = useState({
    name: "",
    email: "",
    rating: 1,
    comments: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const validateForm = () => {
    // Basic validation example
    if (!feedbackFormData.name) {
      return "Name is required!";
    }
    if (!feedbackFormData.email) {
      return "Email is required!";
    }
    if (!/\S+@\S+\.\S+/.test(feedbackFormData.email)) {
      return "Email address is invalid!";
    }
    return ""; // Return an empty string if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (e) => {
    setFeedbackFormData((prev) => ({
      ...prev,
      rating: Number(e.target.value), // Convert to number
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError); // Set error message if validation fails
      return;
    }
    setError("");
    setSubmittedData(feedbackFormData);

    // Success message display
    setSuccessMessage("Thank you for your feedback!");
  };

  return (
    <div className="feedbackForm__wrapper">
      <form className="feedbackForm__container" onSubmit={handleFormSubmit}>
        <h2 className="feedbackForm__title">Customer Feedback Form</h2>

        {error && <p className="feedbackForm__error">{error}</p>}
        {successMessage && (
          <p className="feedbackForm__success">{successMessage}</p>
        )}

        <div className="feedbackForm__inputGroup">
          <label className="feedbackForm__label" htmlFor="name">
            Name:
          </label>
          <input
            className="feedbackForm__inputField"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            value={feedbackFormData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="feedbackForm__inputGroup">
          <label className="feedbackForm__label" htmlFor="email">
            Email:
          </label>
          <input
            className="feedbackForm__inputField"
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            value={feedbackFormData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="feedbackForm__inputGroup">
          <label className="feedbackForm__label" htmlFor="rating">
            Rating:
          </label>
          <select
            className="feedbackForm__inputField"
            id="rating"
            value={feedbackFormData.rating}
            // Using a separate handler function
            onChange={handleRatingChange}
          >
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>

        <div className="feedbackForm__inputGroup">
          <label className="feedbackForm__label" htmlFor="comments">
            Comments:
          </label>
          <textarea
            className="feedbackForm__inputField"
            id="comments"
            name="comments"
            placeholder="Enter your comments"
            value={feedbackFormData.comments}
            rows="3"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="feedbackForm__submitButton">
          Submit Feedback
        </button>
      </form>

      {submittedData && (
        <div className="submittedData__container">
          <h3 className="submittedData__title">Submitted Data:</h3>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Rating: {submittedData.rating}</p>
          <p>Comments: {submittedData.comments}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
