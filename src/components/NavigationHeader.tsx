import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";

interface NavigationHeaderProps {
  step: number;
  goBack: () => void;
}

export const NavigationHeader = ({ step, goBack }: NavigationHeaderProps) => {
  return (
    <div className="flex items-center justify-start w-full">
      {step === 2 && (
        <div className="flex justify-between">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
