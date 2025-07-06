import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaShoppingCart, FaHeart, FaSignOutAlt } from 'react-icons/fa';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid #007bff;
`;

const UserName = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 600;
`;

const UserEmail = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatIcon = styled.div`
  font-size: 24px;
  color: #007bff;
  margin-bottom: 10px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 14px;
`;

const ProfileSection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #555;
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled(Button)`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

const SaveButton = styled(Button)`
  background: #28a745;
  color: white;

  &:hover {
    background: #218838;
  }
`;

const CancelButton = styled(Button)`
  background: #6c757d;
  color: white;

  &:hover {
    background: #5a6268;
  }
`;

const LogoutButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const Message = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const SuccessMessage = styled(Message)`
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled(Message)`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    updateProfile(formData);
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <ProfileContainer>
        <ProfileSection>
          <SectionTitle>Please log in to view your profile</SectionTitle>
        </ProfileSection>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar src={user.avatar} alt={user.name} />
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <StatIcon>
            <FaShoppingCart />
          </StatIcon>
          <StatValue>{getCartItemCount()}</StatValue>
          <StatLabel>Items in Cart</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <FaHeart />
          </StatIcon>
          <StatValue>{getWishlistCount()}</StatValue>
          <StatLabel>Wishlist Items</StatLabel>
        </StatCard>
      </StatsGrid>

      <ProfileSection>
        <SectionTitle>
          <FaUser />
          Profile Information
        </SectionTitle>

        {message.text && (
          message.type === 'success' ? (
            <SuccessMessage>{message.text}</SuccessMessage>
          ) : (
            <ErrorMessage>{message.text}</ErrorMessage>
          )
        )}

        {isEditing ? (
          <Form>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <ButtonGroup>
              <SaveButton onClick={handleSave}>
                <FaSave />
                Save Changes
              </SaveButton>
              <CancelButton onClick={handleCancel}>
                <FaTimes />
                Cancel
              </CancelButton>
            </ButtonGroup>
          </Form>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Label>Full Name</Label>
              <div style={{ padding: '12px 16px', background: '#f8f9fa', borderRadius: '8px' }}>
                {user.name}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Label>Email</Label>
              <div style={{ padding: '12px 16px', background: '#f8f9fa', borderRadius: '8px' }}>
                {user.email}
              </div>
            </div>

            <ButtonGroup>
              <EditButton onClick={handleEdit}>
                <FaEdit />
                Edit Profile
              </EditButton>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </LogoutButton>
            </ButtonGroup>
          </div>
        )}
      </ProfileSection>
    </ProfileContainer>
  );
}

export default Profile; 