import React , {useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext';
import customerService from '../../../../services/customer.service';
function RegisterForm() {
    const [customer_email,setCustomerEmail]=useState("");
    const [customer_phone_number,setCustomerPhone]=useState("");
    const [customer_first_name,setCustomerFirstName]=useState("");
    const [customer_last_name,setCustomerLastName]=useState("");
    const [active_customer_status] = useState(1);
    const [emailError, setEmailError] = useState('');
    const [serverError, setServerError] = useState('');
    const [firstNameRequired, setFirstNameRequired] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!customer_first_name) {
            setFirstNameRequired('First name is required');
            valid = false;
        } else {
            setFirstNameRequired('');
        }

        if (!customer_email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!customer_email.includes('@')) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            const regex = /^\S+@\S+\.\S+$/;
            if (!regex.test(customer_email)) {
                setEmailError('Invalid email format');
                valid = false;
            } else {
                setEmailError('');
            }
        }

        if (!valid) {
            return;
        }

        const formData = {
            customer_email,
            customer_first_name,
            customer_last_name,
            customer_phone_number,
            active_customer_status,
        };

        try {
            const response = await customerService.createCustomer(formData);
            // console.log('Response:', response); // Check response object
            
            // Assuming response is already JSON parsed due to service implementation
            
            if (response.error) {
                setServerError(response.error);
            } else {
                setServerError(''); // Clear server error state on success
                // Optionally handle success state or redirection
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating employee:', error.message);
            setServerError('Error creating employee. Please try again.');
        }
    };
  return (
    <div>RegisterForm</div>
  )
}

export default RegisterForm