import { useEffect, useRef } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const ImagesCarousel = ({ onClose, selectedIndex, imagenes }) => {
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="carousel-overlay">
      <div className="carousel-popup" ref={popupRef}>
        <button className="close-button" onClick={onClose}>X</button>
        <Carousel 
          selectedItem={selectedIndex} 
          showThumbs={false} 
          infiniteLoop 
          useKeyboardArrows 
          showArrows
        >
          {imagenes.map((imagen, i) => (
            <div key={i}>
              <img src={imagen.urlImg} alt={`Imagen ${i + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
