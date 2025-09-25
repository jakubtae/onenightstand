import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";

interface NavigationHeaderProps {
  step: number;
  goBack: () => void;
}

export const NavigationHeader = ({ step, goBack }: NavigationHeaderProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Questionnaire</h2>

      {step >= 2 && (
        <div className="flex justify-between absolute top-6 left-[-6px]">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}
    </>
  );
};
