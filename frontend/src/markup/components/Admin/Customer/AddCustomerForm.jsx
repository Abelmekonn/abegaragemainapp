import React , {useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext';
import customerService from '../../../../services/customer.service';
function AddCustomerForm() {
    const [customer_email,setCustomerEmail]=useState("");
    const [customer_phone_number,setCustomerPhone]=useState("");
    const [customer_first_name,setCustomerFirstName]=useState("");
    const [customer_last_name,setCustomerLastName]=useState("");
    const [active_customer_status] = useState(1);
    const [emailError, setEmailError] = useState('');
    const [serverError, setServerError] = useState('');
    const [firstNameRequired, setFirstNameRequired] = useState('');

    let loggedInEmployeeToken='';
    const {employee}= useAuth();
    if(employee && employee.employee_token){
        // eslint-disable-next-line no-const-assign, no-unused-vars
        loggedInEmployeeToken=employee.employee_token;
    }
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
            const response = await customerService.createCustomer(formData,loggedInEmployeeToken);
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
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Add a new customer</h2>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        <div className="form-group col-md-12">
                                            {serverError && <div className="validation-error" role="alert">{serverError}</div>}
                                            <input type="email" name="employee_email" value={customer_email} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Customer email" />
                                            {emailError && <div className="validation-error" role="alert">{emailError}</div>}
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input type="text" name="employee_first_name" value={customer_first_name} onChange={(e) => setCustomerFirstName(e.target.value)} placeholder="Customer first name" />
                                            {firstNameRequired && <div className="validation-error" role="alert">{firstNameRequired}</div>}
                                        </div>

                                        <div className="form-group col-md-12">
                                            <input type="text" name="employee_last_name" value={customer_last_name} onChange={(e) => setCustomerLastName(e.target.value)} placeholder="customer last name" required />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <input type="text" name="employee_phone" value={customer_phone_number} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Customer phone (555-555-5555)" required />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add customer</span></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddCustomerForm
