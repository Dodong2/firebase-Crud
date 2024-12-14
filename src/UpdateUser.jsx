import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { db } from "./firebase-config";

const UpdateUser = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);

  const handleUpdate = async () => {
    const userDoc = doc(db, "users", user.id);
    const newFields = { name, age: Number(age) };
    await updateDoc(userDoc, newFields);
    onClose(); // Close the update component after saving changes
  };

  return (
    <div className="update-container">
      <h2>Update User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <button onClick={handleUpdate}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

// Define PropTypes for validation
UpdateUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateUser;
