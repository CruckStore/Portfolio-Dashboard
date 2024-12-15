import React, { useEffect, useRef, useState } from 'react';

function Notification({ message, type, onClose }) {
  const timeoutRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const startTimeout = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 3000);
  };

  useEffect(() => {
    if (!isMouseOver) {
      startTimeout();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMouseOver]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    startTimeout();
  };

  return (
    <div
      className={`notification ${type}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Notification;
