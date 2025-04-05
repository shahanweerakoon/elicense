export default function LandPage() {
    return (
        <>
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
      <nav className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/api/placeholder/50/50" alt="Sri Lanka Government Logo" className="h-10" />
            <div>
              <h1 className="font-bold text-lg">Department of Motor Traffic</h1>
              <p className="text-xs text-blue-200">Government of Sri Lanka</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-blue-200 transition">Features</a>
            <a href="#how-it-works" className="hover:text-blue-200 transition">How It Works</a>
            <a href="#contact" className="hover:text-blue-200 transition">Contact</a>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded text-sm">
              Officer Login
            </button>
            <button className="bg-green-600 hover:bg-green-500 py-2 px-4 rounded text-sm">
              User Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Digital Driving License Verification</h1>
            <p className="text-xl mb-8">Verify license authenticity instantly with our official QR-based verification system</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-lg transition">
                Learn More
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded-lg transition">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <img src="/api/placeholder/300/500" alt="License Verification Demo" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-4 -right-4 bg-green-500 p-3 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Verification</h3>
              <p className="text-gray-600">Unique QR codes for each license ensure tamper-proof verification system</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">QR Code Access</h3>
              <p className="text-gray-600">Easily display your license information with a single scan</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Records</h3>
              <p className="text-gray-600">Maintain accurate digital records of all licenses in the system</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-12">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white font-bold mr-4">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Officer Registration</h3>
                    <p className="text-gray-600">Department officers create accounts for license holders with unique IDs and upload license images</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white font-bold mr-4">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">User Access</h3>
                    <p className="text-gray-600">License holders log in to access their digital license and unique QR code</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white font-bold mr-4">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">License Verification</h3>
                    <p className="text-gray-600">When the QR code is scanned, viewers see the validated license information</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img src="/api/placeholder/500/600" alt="How the system works" className="rounded-lg shadow-xl" />
              <div className="absolute -top-6 -right-6 bg-blue-800 text-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-bold">Trusted by</p>
                <p className="text-2xl font-bold">3+ Million</p>
                <p className="text-sm">Sri Lankan drivers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Two Distinct Portals</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Officer Portal */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Officer Portal</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create and manage user accounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Upload and maintain license images</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Generate unique DMT IDs for users</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Update and verify license information</span>
                  </li>
                </ul>
                <button className="mt-8 bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-6 rounded-lg transition">
                  Officer Login
                </button>
              </div>
              <img src="/api/placeholder/600/300" alt="Officer Dashboard Preview" className="w-full h-48 object-cover" />
            </div>
            
            {/* User Portal */}
            <div className="bg-gradient-to-br from-green-700 to-green-800 text-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">User Portal</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View digital driving license</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Generate QR code for verification</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Display high-brightness QR for easy scanning</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access personal license information</span>
                  </li>
                </ul>
                <button className="mt-8 bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-6 rounded-lg transition">
                  User Login
                </button>
              </div>
              <img src="/api/placeholder/600/300" alt="User Dashboard Preview" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">How secure is the verification system?</h3>
              <p className="text-gray-600">Our system uses encrypted QR codes tied to unique URLs that can only be generated by authorized DMT officers, ensuring maximum security and authenticity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">What if I lose my login details?</h3>
              <p className="text-gray-600">Contact the Department of Motor Traffic with your license details, and officers can reset your access credentials.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Can businesses use this for verification?</h3>
              <p className="text-gray-600">Yes, any individual or organization can scan the QR code to verify the authenticity of a driving license without needing login access.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Is an internet connection required?</h3>
              <p className="text-gray-600">Yes, both displaying and scanning the QR code requires an internet connection to access the verification system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">For any inquiries about the Digital Driving License Verification system, please contact us using the form or through our official channels.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600">Department of Motor Traffic, Werahera, Sri Lanka</p>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600">info@motortraffic.gov.lk</p>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-600">+94 11 2866771</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-8">
                <form>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
        </>
    );
}