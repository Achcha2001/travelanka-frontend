import React, { useEffect } from 'react';
import './site.css';
function MapComponent() {
  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBohfiz6rH4UzxzSxZ7vAkp5CH-_NKOKIc&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize map when script is loaded
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 6.9271, lng: 79.8612 }, // Colombo, Sri Lanka coordinates
        zoom: 8,
      });

      const locations = [
        { title: 'Colombo', position: { lat: 6.9271, lng: 79.8612 }, image: '../images/colombo.jpg', },
        { title: 'Negombo', position: { lat: 7.2099, lng: 79.8382 }, image: '../images/negambo.webp', },
        { title: 'Galle', position: { lat: 6.0320, lng: 80.2170 }, image: '../images/galle.jpg' },
        { title: 'Kandy', position: { lat: 7.2906, lng: 80.6337 }, image: '../images/kandy.jpg' },
        { title: 'Nuwara Eliya', position: { lat: 6.9686, lng: 80.7905 }, image: '../images/nuwaraeliya.jpg' },
        { title: 'Jaffna', position: { lat: 9.6610, lng: 80.0255 }, image: '../images/jaffna.jpg' },
        { title: 'Dambulla', position: { lat: 7.8731, lng: 80.6513 }, image: '../images/dambulla.jpg' },
        { title: 'Anuradhapura', position: { lat: 8.3556, lng: 80.3881 }, image: '../images/anuradhapura.jpg' },
        { title: 'Arugam Bay', position: { lat: 6.8709, lng: 81.8287 }, image: '../images/arugambay.jpg' },
        { title: 'Trincomalee', position: { lat: 8.5876, lng: 81.2152 }, image: '../images/trincomalee.jpg' },
        { title: 'Yala', position: { lat: 6.4294, lng: 81.3392 }, image: '../images/yala.jpg' },
        { title: 'Ella', position: { lat: 6.8661, lng: 81.0410 }, image: '../images/ella.jpg' },
      ];

      locations.forEach((location) => {
       let marker = new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.title,
         
        });
        if (location.title === 'Colombo') {
            marker.setIcon({
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            });
        
      
        }
        const image = new window.Image();
        image.src = location.image;
        image.classList.add('marker-image');

        marker.addListener('mouseover', () => {
          image.style.display = 'block';
        });

        marker.addListener('mouseout', () => {
          image.style.display = 'none';
        });
        const infowindow = new window.google.maps.InfoWindow({
            content: `<div>${location.title}</div>`,
          });
  
          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });

          const markerDiv = document.createElement('div');
          markerDiv.appendChild(image);
  
          const markerOverlay = new window.google.maps.OverlayView();
          markerOverlay.setMap(map);
          markerOverlay.draw = function () {
            const overlayProjection = this.getProjection();
            const position = overlayProjection.fromLatLngToDivPixel(location.position);
            image.style.left = `${position.x}px`;
            image.style.top = `${position.y}px`;
          };
          markerOverlay.onAdd = function () {
            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(markerDiv);
          };
  
    }
        
        );
     
 };

    // Clean up the script tag
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
}

export default MapComponent;
