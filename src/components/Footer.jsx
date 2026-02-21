const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 ">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 sm:px-12 py-12">
        <div className="max-w-6xl mx-auto md:flex md:justify-between md:items-center gap-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-lg">
              Subscribe to get the latest updates on new photos and special offers.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-white text-gray-900"
              />
              <button className="px-8 py-3 bg-gray-600 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 sm:px-12 py-12">

        {/* Divider */}
        <div >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © 2026 Pixmart. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-1.5-10a4.5 4.5 0 0110 0z"></path></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"></path><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
