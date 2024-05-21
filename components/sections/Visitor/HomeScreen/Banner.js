import React from 'react';
import CustomCarousel from '../../../widgets/CustomCarousel';
import BannerItem from '../../../items/Visitor/HomeScreen/BannerItem';

function Banner() {
   const items = [
    {
      text: 'Avec Ride-2-school , simplifie la vie scolaire de vos enfants',
      image: require('../../../../assets/images/banner-img3.png')
    },
     {
      text: 'Confiez le trajet de vos enfants à Ride-2-School, votre application de gestion de transport scolaire',
      image: require('../../../../assets/images/banner-img1.png')
    },
     {
      text: "Suivez chaque déplacement de votre enfant en temps réel, sur Google Maps, pour une tranquillité d'esprit absolue",
      image: require('../../../../assets/images/banner-img2.png')
    },
   ]

  const renderBannerItem = (item , index) => <BannerItem item={item}  key={index}/>;
  
  return <CustomCarousel data={items} renderItem={renderBannerItem} widthRatio={1} heightRatio={0.6}/>;
}

export default Banner;
