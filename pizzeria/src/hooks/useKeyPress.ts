import { useEffect } from "react"

export const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    const handleKeyUp = (ev: KeyboardEvent) => {
      const { ctrlKey, shiftKey, key } = ev;
      if (ctrlKey && shiftKey && key === targetKey) {
        callback();
      }
    }
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [targetKey, callback])
}