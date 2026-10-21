export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <div className="brand-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#FFB22C" strokeWidth="2" />
                        <path d="M7 9h10M7 12h6" stroke="#FFB22C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="brand-name">AadhaarOCR</span>
            </div>
            <div className="navbar-tag">Secure · AI-Powered</div>
        </header>
    )
}
