import React from 'react';
import Facebook from './assets/facebook.webp';
import Instagram from './assets/instagram.webp';
import Twitter from './assets/twitter.png';

export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-4 text-black border-t border-black/600 bg-white h-40">
            <div className="flex flex-col items-start space-y-2">
                <p className="text-sm">Mobile Number: 0480237035 <br/> Email: Vic-designer@hotmail.com</p>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/profile.php?id=100015105948052" target="_blank" rel="noopener noreferrer" className="hover:underline"><img src={Facebook} alt="Facebook" className="h-14 w-14"/></a>
                    <a href="https://www.instagram.com/vic_photo_graphy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:underline"><img src={Instagram} alt="Instagram" className="h-14 w-14"/></a>
              {/* //<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline"><img src={Twitter} alt="Twitter" className="h-14 w-14"/></a> */}
                </div>
            </div>
            <div className="flex items-center">
                <p className="text-sm">© 2025 Vic Photography</p>
            </div>

        </footer>
    );
}