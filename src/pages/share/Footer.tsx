import logo from "../../assets/images/preview (1).png";

const Footer = () => {
  return (
    <div className="text-center bg-base-200 py-8">
      <footer className="footer flex flex-col md:flex-row items-center justify-between container mx-auto">
        <aside className="text-left md:text-center">
          {/* Logo and name */}
          <h1 className="text-xl font-semibold font-serif flex items-center gap-3 mb-4 md:mb-0">
            <img
              className="h-[40px] w-[40px] md:h-[70px] md:w-[70px]"
              src={logo}
              alt="Rental Car Logo"
            />
            <p className="flex gap-2 items-center">
              <span className="text-[#49af88] font-extrabold">Rental</span> Car
            </p>
          </h1>

          {/* Subscription Form */}
          <form>
            <fieldset className="form-control w-80 mx-auto">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered flex-grow"
                />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </aside>

        {/* Social Media Links */}
        <nav className="text-black mt-6 md:mt-0">
          <h6 className="footer-title mb-4">Follow Us</h6>
          <div className="grid grid-flow-col gap-6">
            <a href="https://x.com/CampersShop" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/CampersShop" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/CampersShop"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>

      {/* Ownership, Privacy Policy, and Contact Info */}
      <div className="mt-6">
        <ul className="flex flex-wrap justify-center space-x-4 text-gray-500 text-sm">
          <li>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-of-service" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Ownership section with dynamic year */}
      <div className="pt-4 text-sm text-gray-500">
        <span className="text-[#49af88] font-bold">Rental</span> Car ©{" "}
        {new Date().getFullYear()} Created by{" "}
        <span className="text-[#6A9C89]">Md Jaoadul Islam</span>
      </div>
    </div>
  );
};

export default Footer;
