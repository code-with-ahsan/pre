import { persistor } from "../store/store"

export const onStoreReady = async () => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (persistor.getState().bootstrapped) {
        clearInterval(interval);
        resolve(null);
      }
    }, 100)
  })
}