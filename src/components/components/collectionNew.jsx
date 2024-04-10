import React from 'react';

const CollectionSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.nftCard}>
        <img src="path-to-your-image.png" alt="NFT" style={styles.image} />
        <div style={styles.info}>
          <h2 style={styles.title}>Awesome NFTs collection</h2>
          <p style={styles.description}>
            Karuratu is home to 5,595 generative arts where colors reign supreme. 
            Leave the drab reality and enter the world of Karuratu by Museum of Toys.
          </p>
        </div>
      </div>
      <div style={styles.stats}>
        {/* Add stat elements here */}
      </div>
      {/* Add social media icons here */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    backgroundColor: '#000', // Adjust the background color as needed
  },
  nftCard: {
    display: 'flex',
    // Add more styles for the NFT card
  },
  image: {
    width: '100px', // Adjust the width as needed
    height: '100px', // Adjust the height as needed
    // Add more styles for the image
  },
  info: {
    // Add styles for the info section
  },
  title: {
    color: '#fff',
    // Add more styles for the title
  },
  description: {
    color: '#fff',
    // Add more styles for the description
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    // Add more styles for the stats section
  },
  // Add styles for stat elements
  // Add styles for social media icons
};

export default CollectionSection;
