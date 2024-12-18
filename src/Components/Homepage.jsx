// homepage.jsx

import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { LuListTodo } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { RxCountdownTimer } from "react-icons/rx";
import { AiFillCheckCircle } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function Homepage() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "light-mode";
  }, [theme]);

  return (
    <div className={`app-container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <div
        style={{
          backgroundImage: "url('/BlueBlur.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        <section className="px-10 md:px-20">
          <nav className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold">Taskspring</h1>
            <div className="flex items-center gap-4">
              <div className="w-32 h-10 flex justify-center items-center bg-blue-400 rounded-md">
                <a href="#" className="font-bold text-white relative top-[-2px]">
                  Log In
                </a>
              </div>

              <button onClick={toggleTheme} className="theme-toggle">
                {theme === "dark" ? (
                  <FontAwesomeIcon icon={faSun} />
                ) : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
              </button>
            </div>
          </nav>

          <div className="my-20">
            <h1 className="text-4xl md:text-6xl font-bold">
              Plan Your Prioritize, <br /> Be Productive
            </h1>
            <p className="text-lg my-10 mx-0 max-w-2xl">
              Stop wasting time on unproductive activities. Taskspring empowers
              you to take control of your schedule, prioritize tasks, and
              achieve your goals.
            </p>
            <div className="w-64 h-10 flex justify-center bg-blue-400 rounded-md">
              <a href="#" className="flex items-center font-bold text-white px-4 relative top-[-2px]">
                Start Your Journey Here
              </a>
            </div>
          </div>

          <div className="my-32">
            <h2
              className={`text-2xl font-bold ${
                theme === "light" ? "text-[#333333]" : "text-white"
              }`}
            >
              Track Your Study Time
            </h2>
            <p className="my-6 max-w-xl ">
              With Taskspring, you can easily track your study time, helping you
              manage your schedule more effectively and stay organized. By
              understanding your study habits, you’ll boost productivity,
              identify your most productive periods, and develop smarter
              strategies to reach your academic goals with ease.
            </p>
            <img src="/dashboard-1.png" alt="Dashboard" />
          </div>

          <div className="my-20">
            <div className="flex justify-between items-center mb-8">
              <div className="my-auto">
                <h5
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Taskspring
                </h5>
                <h3
                  className={`text-4xl font-bold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Don't Delay Your Work—Start Today!
                </h3>
              </div>
              <div className="icon flex justify-center space-x-4">
                <div className="bg-blue-400 text-white rounded-md p-6">
                  <LuListTodo size={34} />
                </div>
                <div className="bg-blue-400 text-white rounded-md p-6">
                  <FaRegCalendarCheck size={34} />
                </div>
                <div className="bg-blue-400 text-white rounded-md p-6">
                  <RxCountdownTimer size={34} />
                </div>
              </div>
            </div>
            <img src="/dashboard-1.png" alt="Dashboard" />
          </div>

          <div className="sec-3 my-20">
            <div className="box mb-8 flex justify-between">
              <div className="my-auto">
                <h5
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Taskspring
                </h5>
                <h3
                  className={`text-4xl font-bold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Start Discussing with Your Friend—Ignite New Ideas!
                </h3>
              </div>
              <img src="/img-ppl.png" alt="Image" className="w-60 " />
            </div>
            <img src="/dashboard-1.png" alt="Dashboard" />
          </div>

          <div className="pricing text-center my-20 bg-cover bg-no-repeat">
            <h2
              className={`text-4xl font-bold mb-6 ${
                theme === "light" ? "text-[#333333]" : "text-white"
              }`}
            >
              Unlock Exclusive Benefits with Our Best-Selling Package!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6 shadow-md">
                <h3
                  className={`text-xl font-bold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Free
                </h3>
                <ul className="my-4">
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle
                      className={`mr-2 ${
                        theme === "light" ? "text-[#333333]" : "text-white"
                      }`}
                    />
                    2 Schedule at A Time
                  </li>

                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle
                      className={`mr-2 ${
                        theme === "light" ? "text-[#333333]" : "text-white"
                      }`}
                    />
                    Unique Building From Your Schedule
                  </li>

                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle
                      className={`mr-2 ${
                        theme === "light" ? "text-[#333333]" : "text-white"
                      }`}
                    />
                    Limited Team Feature
                  </li>
                </ul>
                <div className="flex justify-center rounded-md mt-16">
                  <a
                    href="#"
                    className={`w-64 h-10 flex justify-center items-center font-bold text-white bg-blue-400 rounded-md ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    Try Now
                  </a>
                </div>
              </div>

              <div className="box border rounded-lg p-6 shadow-md">
                <h3
                  className={`text-xl font-bold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Best Seller
                </h3>
                <h4
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  $5/month
                </h4>
                <ul className="my-4">
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" /> 100 Schedule at A
                    Time
                  </li>
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" /> 10 Person Team
                    Feature
                  </li>
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" /> Priority Support
                  </li>
                </ul>
                <div className="flex justify-center rounded-md mt-16">
                  <a
                    href="#"
                    className={`w-64 h-10 flex justify-center items-center font-bold text-white bg-blue-400 rounded-md ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    Try Now
                  </a>
                </div>
              </div>

              <div className="box border rounded-lg p-6 shadow-md">
                <h3
                  className={`text-xl font-bold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  Professional
                </h3>
                <h4
                  className={`text-lg font-semibold ${
                    theme === "light" ? "text-[#333333]" : "text-white"
                  }`}
                >
                  $15/month
                </h4>
                <ul className="my-4">
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" /> Unlimited Schedule 
                  </li>
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" /> Unlimited Team Feature
                  </li>
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" />Even More Extra Unique Buildings From Your Schedule
                  </li>
                  <li
                    className={`flex items-center justify-center ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    <AiFillCheckCircle className="mr-2" />High Priority Notification
                  </li>
                </ul>
                <div className="flex justify-center rounded-md mt-16">
                  <a
                    href="#"
                    className={`w-64 h-10 flex justify-center items-center font-bold text-white bg-blue-400 rounded-md ${
                      theme === "light" ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    Try Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials text-center my-20">
            <h2
              className={`text-2xl font-bold mb-6 ${
                theme === "light" ? "text-[#333333]" : "text-white"
              }`}
            >
              What People Say About Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="box border rounded-lg p-4 shadow-md">
                <img
                  src="/ppl-1.png"
                  alt="Testimonial"
                  className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
                />
                <p className="italic mb-2">
                  “This website streamlined my workflow and helped me stay on top of my
                  tasks. Best productivity tool I've found!”
                </p>
                <p className="font-bold">— Jack Anderson</p>
              </div>

              {/* Testimonial 2 */}
              <div className="box border rounded-lg p-4 shadow-md">
                <img
                  src="/ppl-2.png"
                  alt="Testimonial"
                  className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
                />
                <p className="italic mb-2">
                  “The tools are easy to use, and since I started using it, my productivity
                  has skyrocketed. It helps me stay organized and focused throughout the
                  day. Highly recommend for anyone looking to improve their efficiency!”
                </p>
                <p className="font-bold">— Maya Grace</p>
              </div>

              {/* Testimonial 3 */}
              <div className="box border rounded-lg p-4 shadow-md">
                <img
                  src="/ppl-3.png"
                  alt="Testimonial"
                  className="mx-auto mb-4 w-24 h-24 object-cover rounded-full"
                />
                <p className="italic mb-2">
                  “This website has drastically improved my productivity! The tools are
                  user-friendly, making it easy to stay organized and focused. Highly
                  recommended!”
                </p>
                <p className="font-bold">— John Smith</p>
              </div>
            </div>
          </div>
        </section>
      
        <footer className="py-8 bg-gray-800 text-white dark:bg-gray-800 dark:text-white light:bg-gray-100 light:text-gray-900 transition-colors">
          <div className="container mx-auto px-6">
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;