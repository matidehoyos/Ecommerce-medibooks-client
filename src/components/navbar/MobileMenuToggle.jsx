const MobileMenuToggle = ({ menuOpen, setMenuOpen }) => (
    
    <button
      className="lg:hidden p-2"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <span className="block w-6 h-[2px] bg-white mb-1"></span>
      <span className="block w-6 h-[2px] bg-white mb-1"></span>
      <span className="block w-6 h-[2px] bg-white"></span>
    </button>
  );
  
  export default MobileMenuToggle;
  