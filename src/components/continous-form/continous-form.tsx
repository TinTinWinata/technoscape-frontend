import { createRef, useState } from 'react';
import { IFormAnswer } from '../../interfaces/form-answer-interface';
import { IFormQuestion } from '../../interfaces/form-question-interface';
import { toastError } from '../../settings/toast-setting';
import Finish from './finish';
import FormDetail from './form-detail';
import ProgressBar from './progress-bar';

const DEFAULT_ACTIVE = -1;

export default function ContinousForm({ forms }: { forms: IFormQuestion[] }) {
  const [finish, setFinish] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [activeBox, setActiveBox] = useState<number>(DEFAULT_ACTIVE);
  const [answers, setAnswers] = useState<IFormAnswer[]>([]);
  const inputRef = createRef<HTMLInputElement>();

  const isCurrentQuestionIsInput = () => {
    return forms[index].answerValue.length == 0;
  };

  const getAnswer = (): number => {
    const currForm: IFormQuestion = forms[index];
    if (isCurrentQuestionIsInput()) {
      // Input Question
      return getAnswerInputRef();
    } else {
      // Answer Question
      return currForm.answerValue[activeBox];
    }
  };

  const getAnswerInputRef = (): number => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      inputRef.current.value = '';
      return parseInt(value);
    }
    return 0;
  };

  const isValidAnswer = (): boolean => {
    if (isCurrentQuestionIsInput()) {
      // Input Question
      if (inputRef.current) {
        if (inputRef.current.value.trim() == '') {
          toastError('Please input the valid fields!');
          return false;
        }
        try {
          parseInt(inputRef.current.value);
          return true;
        } catch (e) {
          toastError('Please input a valid input!');
        }
      } else {
        toastError('Input is not found, please contact Amigo Team!');
        return false;
      }
    } else {
      if (activeBox !== DEFAULT_ACTIVE) {
        return true;
      }
      toastError('You need to select at least one answer.');
      return false;
    }
    return false;
  };

  const handleAddAnswer = () => {
    const newAnswer: IFormAnswer = {
      name: forms[index].questionValue,
      value: getAnswer(),
    };
    setAnswers((prev) => [...prev, newAnswer]);
  };

  const handleNext = () => {
    if (isValidAnswer()) {
      // Add Answer
      handleAddAnswer();

      // Set Current Index
      index + 1 < forms.length ? setIndex(index + 1) : setFinish(true);
      setActiveBox(DEFAULT_ACTIVE);
    }
  };

  if (finish) {
    return (
      <div className="relative w-96  p-6  bg-gray-50 rounded-xl ">
        <Finish answers={answers} />
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      className="shadow-lg  border-opacity-20 relative w-[80%] h-[600px] p-6  bg-gray-50 rounded-xl"
    >
      <ProgressBar from={index + 1} to={forms.length} />
      <FormDetail
        inputRef={inputRef}
        activeBox={activeBox}
        setActiveBox={setActiveBox}
        form={forms[index]}
      />
      {/* Next button */}
      <div className="w-full center translate-x-[-50%] left-[50%] absolute bottom-0">
        <div
          onClick={handleNext}
          className=" w-full bg-primary cursor-pointer   hover:bg-primary transition-all center text-gray-50 p-5 rounded-b-xl font-semibold"
        >
          Next
        </div>
      </div>
    </div>
  );
}
