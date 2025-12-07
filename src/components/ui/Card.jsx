const Card = ({ children, className = "", onClick, delay = 0 }) => {
  return (
    <div
      className={`glass-strong p-6 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
      style={{
        animationDelay: `${delay}ms`,
        animation: "glass-appear 0.6s ease-out forwards",
        opacity: 0,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
        }
      }}
    >
      {children}
    </div>
  );
};

export default Card;
