export const getUsersCount = async () => {
  const resp = await fetch('https://api.randomuser.me?results=20&seed=cwa');
  const jsonResp = await resp.json();
  return jsonResp.info.results as number; 
}