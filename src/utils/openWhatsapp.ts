export const openWhatsApp = (phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace('+', '').trim();
  const url = `https://wa.me/${formattedNumber}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
