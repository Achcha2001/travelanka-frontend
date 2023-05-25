import React from "react";
//import './home.css';

import './PhotoGrid.css'; 






import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function PhotoGrid() {
  const photos = [
    {
      id: 1,
      name: 'Photo 1',
      imageUrl: '../images/back2.jpg',
    },
    {
      id: 2,
      name: 'Photo 2',
      imageUrl: '../images/back2.jpg',
    },
    {
      id: 3,
      name: 'Photo 3',
      imageUrl: '../images/back2.jpg',
    },
    {
      id: 4,
      name: 'Photo 4',
      imageUrl: '../images/back2.jpg',
    },
  ];

  return (
    <div>
        <div className="para1">
      <p>.</p>
      <p></p>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <LazyLoadImage
              src={photo.imageUrl}
              alt={photo.name}
              effect="opacity"
              className="photo-image"
            />
            <p className="photo-name">{photo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGrid;
