import React from 'react';
import { schoolData } from '../data/schoolData';

const Footer: React.FC = () => {
  const { name, contacts, location } = schoolData.institution;
  return (
    <footer className="bg-brand-text text-white mt-16">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold font-heading">{name}</h3>
            <p className="mt-2 text-gray-300">{location}</p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold font-heading">Contact Us</h3>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>Email: {contacts.email}</li>
              <li>Phone: {contacts.phone.join(' / ')}</li>
            </ul>
          </div>
           <div className="md:col-span-1">
            <h3 className="text-lg font-semibold font-heading">Quick Links</h3>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li><a href="#" className="hover:text-brand-yellow">Home</a></li>
              <li><a href="#" className="hover:text-brand-yellow">Admissions</a></li>
              <li><a href="#" className="hover:text-brand-yellow">Fees</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>
            Built By <a href="https://julishasolutions.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-300 hover:text-brand-yellow transition-colors">Julisha Solutions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
