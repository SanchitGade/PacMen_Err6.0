import Link from "next/link";
import "./style.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <div className="logo">KAMI</div>
      <div className="navi">
        <Link href="/startup" className="pfpDiv">
          S {/* Icon for Startups */}
        </Link>
        <Link href="/investors" className="pfpDiv">
          I {/* Icon for Investors */}
        </Link>
        <Link href="/mentors" className="pfpDiv">
          M {/* Icon for Mentors */}
        </Link>
        <Link href="/researchersDash" className="pfpDiv">
          R {/* Icon for Researchers */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
