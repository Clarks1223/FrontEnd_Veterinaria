import logoDarkMode from '../assets/dark.png';
import logoGithub from '../assets/github.png';
import logoLinkedind from '../assets/linkedin.png';
import logoRocket from '../assets/rocket.webp';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LandinPage = () => {
  const [darkMode, setdarkMode] = useState(false);
  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800">
        <section>
          <nav className="p-10 mb-12 flex justify-between">
            <h1 className="text-2xl font-bold dark:text-white">App-Demo</h1>
            <ul className="flex items-center">
              <li>
                <img
                  onClick={() => setdarkMode(!darkMode)}
                  className="cursor-pointer"
                  src={logoDarkMode}
                  alt="logo"
                  width={40}
                  height={40}
                />
              </li>
              <li>
                <Link
                  to="/login"
                  className="bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white"
                  href="#"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-center">
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              NovaPet
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
              Crafted by Clarks
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
              Welcome to my school project for the veterinary clinic's new
              website! Designed to simplify client management and pet tracking,
              my platform allows veterinarians to record symptoms, manage
              clients, and enhance animal care efficiently. Join me as I explore
              more connected and effective veterinary care.
            </p>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
              Connect with me on my social networks! Discover more about my
              projects and stay updated with the latest news. Feel free to
              contact me for any inquiries or collaborations!
            </p>
          </div>

          <div className="text-5xl flex justify-center gap-10 py-3">
            <a href="https://github.com/Clarks1223" target="blank">
              <img
                src={logoGithub}
                alt="logo-redes"
                width={50}
                height={50}
                className={'dark:border-2 border-teal-300 rounded-full'}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/pablo-uchuari-b25242197/"
              target="blank"
            >
              <img
                src={logoLinkedind}
                alt="logo-redes"
                width={50}
                height={50}
                className={'dark:border-2 border-teal-300 rounded-full'}
              />
            </a>
          </div>

          <div className="relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300">
            <img src={logoRocket} alt="logo-rocket" />
          </div>
        </section>
      </main>
    </div>
  );
};
