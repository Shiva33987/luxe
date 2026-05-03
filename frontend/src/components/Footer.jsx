import React from 'react';
import { Globe, Smartphone, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>Aira Luxe</h2>
            <p>Elevating beauty to an art form. Your sanctuary for luxury styling and wellness.</p>
            <div className="social-links">
              <a href="#" aria-label="Globe"><Globe size={20} /></a>
              <a href="#" aria-label="Smartphone"><Smartphone size={20} /></a>
              <a href="#" aria-label="MessageCircle"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Our Artists</a></li>
                <li><a href="#">Gallery</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="contact-info">
                <li><MapPin size={16} /> 123 Elegance Blvd, NY 10001</li>
                <li><Phone size={16} /> +1 (555) 123-4567</li>
                <li><Mail size={16} /> appointment@luxesalon.com</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Aira Luxe Salon. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
