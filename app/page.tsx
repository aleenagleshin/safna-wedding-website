"use client";

import { useEffect, useState } from "react";

// Note: In your actual Next.js app, add these imports at the top of your file:
// import { Great_Vibes, Playfair_Display, Lato } from 'next/font/google';
// 
// const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });
// const playfair = Playfair_Display({ weight: ['400', '600', '700'], subsets: ['latin'] });
// const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });

export default function Home() {
  const targetDate = new Date("December 6, 2025 00:00:00").getTime();

  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = async () => {
    if (!name.trim() || !message.trim()) return;


    setLoading(true);
    setError("");
    setMessageSent(false);
    await fetch("https://script.google.com/macros/s/AKfycbxff2L0RqW1Y1GgTPkcmRDaZdVMr9t2kRBsivzkd2ZjQatLr_N5nw4uzh8i6X7xeNSoPg/exec", {
      method: "POST",
      body: JSON.stringify({ name, msg: message })
    });

    setLoading(false)
    setMessageSent(true);
    setName("");
    setMessage("")
    setTimeout(() => setMessageSent(false), 2000);

  };


  return (
    <div className="bg-black text-white relative overflow-hidden" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Google Fonts - Load in production via next/font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
      `}</style>

      {/* Starry background effect */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Hero Section with Parallax */}
      <section
        className="relative h-screen flex justify-center items-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: 'url("/venue.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay with transition */}
        <div
          className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${scrolled ? 'bg-black/15' : 'bg-black/75'
            }`}
        />

        <div className="text-center z-10 px-4">
          <h1
            className="text-6xl md:text-7xl lg:text-8xl mb-8 tracking-wide"
            style={{
              fontFamily: 'Great Vibes, cursive',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Safna Shamli <br />& <br /> Shanib Jan
          </h1>
          <p
            className="text-xl md:text-2xl opacity-95 font-light leading-relaxed tracking-wide"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            With the blessings of Allah <br />
            we invite you to our Nikah
          </p>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="flex justify-center py-9 px-1 -mb-2 relative z-10">
        <div className="rounded-3xl p-10 text-center max-w-xl w-full relative z-10 backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300">
          <h2
            className="text-4xl md:text-5xl font-normal text-gray-100 mb-3"
            style={{ fontFamily: 'Great Vibes, cursive' }}
          >
            Mark Our Special Day
          </h2>
          <p className="text-base text-gray-300 mb-2" style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}>
            Counting Down To
          </p>
          <p className="text-2xl mb-2 animate-pulse">❤</p>
          <p className="text-xl font-medium mb-6 text-gray-50" style={{ fontFamily: 'Playfair Display, serif' }}>
            6 December 2025
          </p>

          <div className="flex justify-center gap-4 md:gap-8 text-gray-50 mb-5">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white/10 rounded-xl p-3 md:p-4 backdrop-blur-sm hover:bg-white/20 transition-all">
                <span
                  className="text-3xl md:text-4xl min-w-[60px] text-center"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                >
                  {item.value || 0}
                </span>
                <span
                  className="text-xs mt-1 text-gray-200 uppercase tracking-wider"
                  style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p
            className="text-sm italic opacity-100 mt-4 text-gray-50"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
          >
            <br />
            "And We created you in pairs"<br /> — Quran 78:8
          </p>
        </div>
      </section>

      {/* Venue Section with Parallax */}
      <section
        className="py-10 px-5 relative z-10 overflow-hidden"
        style={{
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664304118366-216dbb7c76cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Invitation overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="relative z-10 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2
                className="text-5xl md:text-6xl text-white mb-6"
                style={{ fontFamily: 'Great Vibes, cursive' }}
              >
                Cherish This Special Day Together ❤
              </h2>
              <p
                className="text-lg md:text-xl leading-relaxed text-gray-100 px-4"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
              >
                We request the honour of your presence at our Nikah ceremony.
                Your blessings, love and wishes on our special day will make us
                truly happy and grateful.
              </p>
            </div>
          </div>
        </div>

        {/* Map and Details */}
        <div className="flex flex-wrap gap-6 mt-10 items-start relative z-10 max-w-6xl mx-auto">
          <div className="w-full md:w-[35%] bg-black/55 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-black/70 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-3xl text-white font-bold"
              // style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
              >
                Getting There
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p
                  className="text-xl leading-relaxed text-white mb-1 capitalize"
                // style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
                >
                  Kunhimmu Auditorium
                </p>
                <p
                  className="text-base text-gray-300"
                  style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
                >
                  Tirur, Kerala 676101
                </p>
              </div>
              <div className="pt-3 border-t border-white/20">
                <div className="flex items-center gap-2 text-gray-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p
                    className="text-base"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400 }}
                  >
                    6 December 2025
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-200 mt-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p
                    className="text-base"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400 }}
                  >
                    12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%] rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
            <iframe
              src="https://www.google.com/maps?q=10.9153305,75.9375966&hl=en&z=16&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-16 px-5 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col items-center text-center gap-6">
            <h2
              className="text-5xl md:text-6xl"
              style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              Send Your Wishes 💌
            </h2>
            <p
              className="text-gray-400 text-lg"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
            >
              Drop a message for the happy couple
            </p>

            <div className="w-full p-8 md:p-12 rounded-3xl shadow-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full mb-4 p-4 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-gray-800 text-lg focus:outline-none focus:border-stone-500 focus:bg-white transition-all shadow-inner"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your heartfelt wishes here..."
                className="w-full min-h-[180px] p-6 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-gray-800 text-lg focus:outline-none focus:border-stone-500 focus:bg-white transition-all resize-y shadow-inner"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
              <button
                onClick={handleSendMessage}
                className="mt-6 px-8 py-3 bg-white text-black text-lg rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}
              >
                {loading
                  ? "Sending..."
                  : messageSent
                   ? "✓ Thanks for the wishes 🖤"
                    : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </section >

      {/* Final Section with Parallax */}
      < section
      className="relative flex items-end justify-center h-[90vh] px-10 pb-32 text-center"
        style={{
          backgroundImage: 'url("/final.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }
        }
      >
        <div className="absolute inset-0 bg-[#2a282880] z-0" />
        <h1
          className="relative z-10 text-6xl md:text-8xl  text-white animate-pulse"
          style={{
            fontFamily: 'Great Vibes, cursive',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
          }}
        >
          See You There!
        </h1>
      </ section>

      {/* Footer */}
      < footer
        className="text-center py-6 bg-black text-gray-100 text-base relative z-10 border-t border-white/10"
        style={{ fontFamily: 'Lato, sans-serif', fontWeight: 300 }}
      >
        <p className="m-0">Coded with love Aleena ❤ Athul</p>
      </footer >
    </div >
  );
}