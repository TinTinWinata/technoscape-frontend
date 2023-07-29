import { Player } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';

export default function Dog() {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      className="absolute left-0 top-10 z-0 w-32 h-32 translate-y-[-100%]"
    >
      <div
        className={`absolute w-full h-full ${
          hover ? 'top-32' : 'top-0'
        } transition-all`}
      >
        <Player speed={0.5} src={'/animation/dog.json'} autoplay loop />
      </div>
    </div>
  );
}
