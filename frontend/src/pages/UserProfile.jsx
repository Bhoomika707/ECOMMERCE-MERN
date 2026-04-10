import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../services/api';
import { loginSuccess } from '../redux/slices/authSlice';

const UserProfile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone || '',
          address: response.data.user.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.replace('address.', '');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await updateUserProfile(formData);
      dispatch(loginSuccess({ user: response.data.user, token: localStorage.getItem('token') }));
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Address</h3>
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mb-2 focus:outline-none focus:border-blue-600"
              />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="address.zipCode"
                  placeholder="Zip Code"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  name="address.country"
                  placeholder="Country"
                  value={formData.address.country}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div>
            <p className="mb-4"><strong>Name:</strong> {formData.name}</p>
            <p className="mb-4"><strong>Email:</strong> {formData.email}</p>
            <p className="mb-4"><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
            {formData.address && (
              <div>
                <h3 className="font-bold mb-2">Address:</h3>
                <p>{formData.address.street}</p>
                <p>{formData.address.city}, {formData.address.state} {formData.address.zipCode}</p>
                <p>{formData.address.country}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;