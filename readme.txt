# RentWheels – Car Rental Platform

Live Site:

RentWheels is a full-stack MERN application that connects users with local car owners or rental providers. Users can browse available cars, view details, and book rentals for specific dates. Car providers can list vehicles, manage bookings, and update availability.
## Features
1. User Authentication & Authorization**  
   - Email/password login and registration with Google Sign-In.  
   - Private routes for adding cars, viewing bookings, and managing listings.  
2. Car Browsing & Booking**  
   - Browse all available cars from all providers.  
   - View detailed information about each car, including provider info.  
   - Book cars directly with real-time availability updates.  
3. Car Management for Providers**  
   - Add, update, and delete car listings.  
   - Track bookings for listed cars.  
   - Automatic status update (Available / Booked) after bookings.  
4. Interactive UI/UX**  
   - Hero banner/slider on the homepage with meaningful service information.  
   - Featured cars, top-rated cars, and customer testimonial sections.  
   - Toast notifications for success/error messages for better user experience.  
5. Responsive Design & Loading Handling**  
   - Works perfectly on mobile, tablet, and desktop.  
   - Loading spinners while fetching data to improve usability.  
   - Custom 404 page for unmatched routes.  
## Pages & Routes
- **Home** – Hero banner, featured cars, top-rated cars, and testimonials.  
- **Browse Cars** – View all available cars (public route).  
- **Car Details** – Private route with full details and "Book Now" button.  
- **Add Car** – Private route for providers to add new cars.  
- **My Listings** – Private route to manage provider's car listings.  
- **My Bookings** – Private route to view all booked cars.  
- **Login / Register** – Authentication pages with validation and Google login.  

---

## Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Toastify / SweetAlert  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas)  
- **Authentication:** Firebase Authentication (Email & Google)  
- **Hosting:** Netlify / Firebase (Frontend), Vercel (Backend)  
