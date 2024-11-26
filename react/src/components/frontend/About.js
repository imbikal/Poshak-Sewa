import React from "react";
import Footer from "./Footer";

const About = () => {
    return (
        <div className="bg-gradient-to-b from-white-600 to-indigo-700 h-96 w-full">
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-700 ">Welcome to Cloth Rental, the premier destination for all your clothing rental needs. We pride ourselves on offering a seamless and stylish rental experience that combines convenience, affordability, and sustainability.</p>
                    <p className="font-normal text-base leading-6 text-gray-700 ">At Cloth Rental, we understand that fashion is more than just clothing. it's an expression of your unique personality and style. We believe that everyone deserves access to a diverse and ever-evolving wardrobe that allows them to feel confident and empowered in every occasion.</p>
                    <p className="font-normal text-base leading-6 text-gray-700 ">Our extensive collection showcases a carefully curated selection of high-quality garments from top designers and sought-after brands. From trendy statement pieces to timeless classics, we offer a wide range of options to cater to your individual taste and preferences. Whether you're attending a special event, a business function, or simply looking to refresh your everyday wardrobe, we've got you covered.
</p>
<p className="font-normal text-base leading-6 text-red-600">Thank you for choosing Cloth Rental. Embrace your individuality and celebrate your style with us.</p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">At Cloth Rental, our story began with a passion for fashion and a vision to revolutionize the way people experience clothing. We embarked on a mission to offer a unique solution that merges style, convenience, and sustainability</p>

<p className="font-normal text-base leading-6 text-gray-600 ">From humble beginnings, we built Cloth Rental into the premier destination it is today. Our dedicated team worked tirelessly to curate an extensive collection of high-quality garments from top designers and brands, ensuring a diverse selection that caters to different tastes and styles.
</p>
<p className="font-normal text-base leading-6 text-gray-600 ">As we continue to grow and evolve, we remain dedicated to providing you with a wardrobe that reflects your individuality and empowers you to embrace your personal style. Join us at Cloth Rental and be a part of the fashion revolution.
</p>

                </div>
                <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Alexa</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Olivia</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Liam</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured img" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Elijah</p>
                        </div>
                    </div>
                </div>
           
            </div>
            
           
        </div>
        <Footer />
        </div>
       
    );
};

export default About;
