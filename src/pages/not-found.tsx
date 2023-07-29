import { Player } from '@lottiefiles/react-lottie-player';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonType } from '../components/button';

export default function NotFound() {
  const navigate = useNavigate();
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/home');
  };
  const [onLoad, setLoad] = useState<boolean>(false);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen h-screen overflow-hidden relative"
    >
      <div className="absolute min-h-[80%] min-w-[400px]  left-[50%] top-[50%] sm:top-[45%] translate-x-[-50%] translate-y-[-50%]">
        <Player
          className="w-[100%]"
          autoplay
          loop
          src={'/animation/not-found.json'}
        />
        <div className="text-center absolute w-full left-[50%] translate-x-[-50%] bottom-[10%] sm:bottom-[-1%]">
          <h1 className="text-3xl font-bold">Oops, Page not Found</h1>
          <p className="mt-3 text-gray-600">
            Sorry, but the requested page is not found. You might others page
          </p>
          <Button className="mt-5" buttonType={ButtonType.Outline}>
            Back
          </Button>
        </div>
      </div>
    </form>
  );
}
