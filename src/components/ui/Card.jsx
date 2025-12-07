const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      className={`glass-strong p-6 ${
        onClick ? "cursor-pointer hover:scale-[1.02]" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
