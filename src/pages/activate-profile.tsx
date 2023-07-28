import ContinousForm from '../components/continous-form/continous-form';
import Navbar from '../components/navbar';
import { IFormQuestion } from '../interfaces/form-question-interface';

const EXAMPLE_QUESTIONS: IFormQuestion[] = [
  {
    questionValue: 'married',
    question: 'Apakah anda sudah menikah ?',
    answer: ['Ya', 'Belum'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'dependent',
    question:
      'Berapa banyak kerabat dekat anda yang anda sering temui dan anda kenal dekat ?',
    answer: ['3+', '3', '2', '1', '0'],
    answerValue: [4, 3, 2, 1, 0],
  },
  {
    questionValue: 'education',
    question: 'Apa latar belakang pendidikan anda ?',
    answer: ['Sarjana', 'Dibawah Sarjana'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'self_employed',
    question: 'Apakah anda seorang karyawan mandiri ?',
    answer: ['Ya', 'Tidak'],
    answerValue: [1, 0],
  },
  {
    questionValue: 'income',
    question: 'Berapa jumlah pendapatan anda ?',
    answer: ['Ex. 10.000.000'],
    answerValue: [],
  },
  {
    questionValue: 'coappliciant_income',
    question:
      'Jika, anda memiliki pasangan / keluarga berapa jumlah pendapatan bersama pasangan / keluarga anda ?',
    answer: ['Ex. 10.000.000'],
    answerValue: [],
  },
  {
    questionValue: 'property_area',
    question: 'Apa jenis property area perumahan anda ?',
    answer: ['Perkotaan', 'Semi Perkotaan', 'Pedesaan'],
    answerValue: [2, 1, 0],
  },
];

export default function ActivateProfile() {
  return (
    <>
      <Navbar />
      <ContinousForm forms={EXAMPLE_QUESTIONS} />
    </>
  );
}
