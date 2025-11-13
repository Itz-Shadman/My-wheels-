import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="text-center">
        <h2 className="text-lg font-bold">RentWheels</h2>
        <p>Contact: info@rentwheels.com</p>
        <p>Terms & Conditions | Privacy Policy</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
