import React, { useState } from 'react';
import Footer from './Footer';
import emailjs from 'emailjs-com';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        country: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare email data
        const emailData = {
            from_name: formData.name,   // Sender's name
            to_name: "Recipient's Name", // Change this to the actual recipient's name if needed
            message: formData.message,    // Message from the form
            email: formData.email,        // Optional: Include sender's email
            company: formData.company,    // Optional: Include company name
            country: formData.country      // Optional: Include country
        };

        // Send email through EmailJS
        emailjs.send('service_f7cps6l', 'template_0678qx9', emailData, 'q8zu08uOsGOmZXAr1')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSuccessMessage('Email sent successfully!');
                setErrorMessage('');
                setFormData({ name: '', email: '', company: '', country: '', message: '' }); // Reset form
            })
            .catch((err) => {
                console.error('FAILED...', err);
                setErrorMessage('Failed to send email. Please try again.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="h-full w-full">
            <div className="md:px-20 px-4 py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-8 text-4xl text-center">Contact Us</h1>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-center my-12">
                <div className="bg-white dark:bg-gray-800 shadow rounded py-16 lg:px-28 px-8">
                    <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700 dark:text-black">
                        Let’s chat and get a quote!
                    </p>
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="md:flex items-center mt-12">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800 dark:text-black">Name</label>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-450" 
                                    placeholder="Please input name" 
                                    required 
                                />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6">
                                <label className="text-base font-semibold leading-none text-gray-800 dark:text-black">Email Address</label>
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-450" 
                                    placeholder="Please input email address" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="md:w-72 flex flex-col">
                                <label className="text-base font-semibold leading-none text-gray-800 dark:text-black">Company name</label>
                                <input 
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-450" 
                                    placeholder="Please input company name" 
                                    required 
                                />
                            </div>
                            <div className="md:w-72 flex flex-col md:ml-6">
                                <label className="text-base font-semibold leading-none text-gray-800 dark:text-black">Country</label>
                                <input 
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-450" 
                                    placeholder="Please input country name" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-col mt-8">
                            <label className="text-base font-semibold leading-none text-gray-800 dark:text-black">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="h-36 text-base leading-none text-gray-900 p-3 focus:outline-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-450 resize-none" 
                                placeholder="Leave a message"
                                required 
                            ></textarea>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 dark:text-black-200 mt-4">
                            By clicking submit you agree to our terms of service, privacy policy and how we use data as stated.
                        </p>
                        <div className="flex items-center justify-center w-full">
                            <button type="submit" className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;
