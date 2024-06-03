import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { Nav } from './Nav';

const AddAdminUser = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const token = sessionStorage.getItem('token');
  const adminId = sessionStorage.getItem('adminId')
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

    const [formData, setFormData] = useState({
      fullName: '',
      email:'',
      password:''

    });
  
    useEffect(() => {
      setEmailError('');
    }, [formData.email]);
  
    const validatePassword = () => {
      const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
      
      const isValid = passwordRegex.test(formData.password);
      console.log('Password:', formData.password);
      console.log('Is Valid:', isValid);
    
      if (isValid) {
        // Password meets the criteria
        setPasswordError('');
        return true;
      } else {
        // Password does not meet the criteria
        setPasswordError('Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.');
        return false;
      }
    };  

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const togglePasswordVisibility1 = () => {
      setShowPassword1((prevShowPassword) => !prevShowPassword);
    };
  
    const validateConfirmPassword = () => {
      if (formData.password !== formData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        return false;
      } else {
        setConfirmPasswordError('');
        return true;
      }
    };
  
  
  
    const handleSendOTP = async () => {
      if (
        !validateConfirmPassword()
      ) {
        alert("Invalid input")
  
      }else{
           try {
              await axios.post('http://localhost:8080/api/v1/otp/sendOTP', { email: formData.email });
              setOtpSent(true);
              setResendCooldown(120);
              } catch (error) {
              alert('Failed to send OTP. Please try again.');
          }
      }       
  
  
    };

  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      const data = new FormData();
      data.append('request', JSON.stringify(formData));
      const response = await fetch(`http://localhost:8080/api/v1/admin/register`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('User saved successfully')
        console.log('User saved successfully');
        navigate('/adminPage');
        window.location.reload();
      } else if(response.status == '400') {
        const error = await response.text();

        alert(`Error saving user: Email already exist.`)
      }else{
          const error = await response.text();
          alert(errorMessage)
          navigate('/adminPage');
          window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      alert(errorMessage)
      navigate('/adminPage');
      window.location.reload();
    }                
      };
  
const textStyle = {
  fontWeight: 'bold',
  userSelect: 'none',
};
  return (
  <>
   <cenetr><div className='container my-4'><Nav/></div></cenetr>
   <div className='container my-4 fs-1' style={textStyle}>
      <center>Add a Admin.</center>
    </div>
    <form onSubmit={handleSubmit} className='container my-4 fs-5 text-left'>

      
      <div className='row my-4 '>
        
        <div className='col-lg-5 col-md-12 mx-4 '>
          <label className='mb-1'>Full Name: </label>
          <input  type="text" name="fullName" onChange={handleInputChange} className='form-control' required value={formData.fullName}  />
        </div>
      </div>
      <div className='row my-4'>
      <div className='col-lg-10 col-md-12 mx-4'>
          <label className='mb-1'>E-mail:</label>
          <input type="email" name="email" onChange={handleInputChange} className='form-control' value={formData.email} required disabled={otpVerified} />
          <div className ='fs-6'  style={{ color: 'red' }}>{emailError}</div>
      </div>
      </div>       

      <div className='row'>
                  <button type="button" class="btn btn-warning m-4" onClick={handleSubmit}>
                          Submit
                  </button>           
      </div>
                  <br/>
    
      <div className='container'>
          <div className='row col-10'>
   
          </div>
 
      </div>
    </form>
    </>
  );
}

export default AddAdminUser