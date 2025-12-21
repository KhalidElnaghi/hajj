const handleOpenMap = (lat: string, lng: string) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(mapUrl, '_blank');
};
export default handleOpenMap
