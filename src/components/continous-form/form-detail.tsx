import { Dispatch, RefObject, SetStateAction } from 'react';
import { IFormQuestion } from '../../interfaces/form-question-interface';

interface FormDetailProps {
  form: IFormQuestion;
  activeBox: number;
  setActiveBox: Dispatch<SetStateAction<number>>;
  inputRef: RefObject<HTMLInputElement>;
}

export default function FormDetail({
  form,
  activeBox,
  setActiveBox,
  inputRef,
}: FormDetailProps) {
  const getAnswerClass = (index: number) =>
    `w-full border border-primary  cursor-pointer  border-opacity-20 rounded-md p-3 text-sm tracking-wider my-2  hover:bg-primary hover:text-gray-200 transition-all font-semibold   ${
      index == activeBox ? getActiveClass() : ' text-gray-500 '
    }`;
  const getActiveClass = () => ' bg-primary text-gray-50  ';
  return (
    <div className="relative">
      <div className="font-bold  my-6 text-gray-700 tracking-wide text-left text-2xl ">
        {form.question}
      </div>
      <div className="hr"></div>
      {/* Answer */}
      <div className="overflow-y-hidden scrollbar-hide h-[300px]">
        {form.answerValue.length == 0 ? (
          <input
            ref={inputRef}
            placeholder={form.answer[0]}
            type=""
            className="focus:outline-none w-full p-2 bg-transparent rounded-md border border-primary border-opacity-20"
          />
        ) : (
          form.answer.map((answer: any, index: number) => (
            <div
              onClick={() => setActiveBox(index)}
              key={index}
              className={getAnswerClass(index)}
            >
              {answer}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
