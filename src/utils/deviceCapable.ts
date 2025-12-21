function isDeviceCapableOfCalling(): boolean {
  const { userAgent } = window.navigator;

  return (
    /Android/i.test(userAgent) || (/iPhone/i.test(userAgent) && !/iPad|iPod/i.test(userAgent))
  );
}
export default isDeviceCapableOfCalling
