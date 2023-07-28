import { useEffect, useState } from 'react';

export default function Greeting() {
  const [text, setText] = useState<string>('');
  useEffect(() => {
    (function () {
      let data = {
        alphabet: [
          'Wow',
          '我是一个好孩子',
          '道路を横断する祖母を助けます',
          '부지런히 저장',
        ],
        wordList: [
          'Hi',
          'Halo',
          'Bonjour',
          'Aloha',
          '您好',
          'こんにちは',
          '안녕하세요',
        ],
        currentSalutation: '',
        currentIndex: 0,
        wrongWriteFlag: 0,
        cursorStatus: 0,
      };

      let changeSalutation = () => {
        setText(data.currentSalutation);
      };

      let removeWord = () => {
        data.currentSalutation = '';
      };

      let writeWord = () => {
        if (
          Math.random() < 0.3 &&
          data.wrongWriteFlag === 0 &&
          data.currentSalutation.length > 0
        ) {
          var language = Math.max(0, data.currentIndex - 3);
          var randomIndex = Math.floor(
            Math.random() * data.alphabet[language].length
          );
          data.currentSalutation += data.alphabet[language][randomIndex];
          data.cursorStatus = 2;
          data.wrongWriteFlag = 1;
        } else {
          data.currentSalutation = data.wordList[data.currentIndex].substr(
            0,
            data.currentSalutation.length + 1
          );
          data.wrongWriteFlag = 0;
        }
      };

      let processNextStep = (time: any) => {
        data.cursorStatus = (data.cursorStatus + 1) % 2;
        setTimeout(process, time);
      };

      let process = () => {
        if (data.cursorStatus === 0) {
          removeWord();
          if (data.currentSalutation.length > 0)
            setTimeout(process, 50 + Math.random() * 30);
          else {
            processNextStep(300);
            data.currentIndex = (data.currentIndex + 1) % data.wordList.length;
          }
        } else if (data.cursorStatus === 1) {
          writeWord();
          if (
            data.currentSalutation.length <
            data.wordList[data.currentIndex].length
          ) {
            setTimeout(process, 100 + Math.random() * 30);
          } else processNextStep(5000);
        } else if (data.cursorStatus === 2) {
          removeWord();
          data.cursorStatus = 1;
          setTimeout(process, 300 + Math.random() * 30);
        }
        changeSalutation();
      };

      data.currentSalutation = data.wordList[data.currentIndex];

      process();
    })();
  }, []);
  return <div>{`${text !== '' ? text + ', ' : text} `}</div>;
}
