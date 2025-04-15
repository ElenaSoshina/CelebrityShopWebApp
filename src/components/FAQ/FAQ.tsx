import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { QuestionForm } from '../QuestionForm/QuestionForm';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'Почему цены в маркете отличаются от цен в игре?',
    answer: 'Мы совершаем покупки через аккаунт клиента из разных регионов, где цены значительно отличаются от локальных. При этом учитываются налоги, комиссии платежных систем, бирж и другие расходы, что в итоге формирует итоговую стоимость.'
  },
  {
    id: 2,
    question: 'Почему у других цены могут быть дешевле?',
    answer: 'Мы работаем полностью легально, оплачиваем все налоги и используем только официальные способы оплаты. Это гарантирует безопасность ваших данных и аккаунта. Наши специалисты всегда проверяют корректность предоставленной информации и помогают на каждом этапе покупки.'
  },
  {
    id: 3,
    question: 'Как происходит покупка и зачем нужны данные аккаунта?',
    answer: 'Для совершения покупки наши специалисты используют ваш аккаунт, входя через внутриигровой магазин. Это единственный безопасный способ получить игровые ценности. Мы понимаем ваши опасения по поводу передачи данных, но это необходимо для выполнения заказа.'
  },
  {
    id: 4,
    question: 'Могу ли получить бан в игре за покупку через ваш маркет?',
    answer: 'Нет, за все время нашей работы таких случаев не было. Мы совершаем покупки официально через внутриигровой магазин, просто из других регионов, где это доступно. Это полностью легальный процесс, в отличие от серых схем, которые могут привести к блокировке.'
  },
  {
    id: 5,
    question: 'Вы храните мои данные после выполнения заказа?',
    answer: 'Нет, сразу после выполнения заказа все ваши данные автоматически удаляются из нашей системы. Даже в случае потенциальной утечки данных, ваша информация будет в безопасности, так как она не хранится в нашей базе.'
  },
  {
    id: 6,
    question: 'Что делать, если заказ не выполнен?',
    answer: 'Единственная причина невыполнения заказа - это отсутствие связи с вами во время процесса. Нашим специалистам может потребоваться ваша помощь для входа в аккаунт. Пожалуйста, оставайтесь на связи во время выполнения заказа, чтобы мы могли гарантировать успешное завершение.'
  }
];

export const FAQ: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleItemClick = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const handleFormOpen = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <section id="faq" className={styles.faq}>
      <h2 className={styles.title}>Часто задаваемые вопросы</h2>
      <div className={styles.container}>
        {faqItems.map((item) => (
          <div 
            key={item.id} 
            className={`${styles.item} ${openItemId === item.id ? styles.active : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <div className={styles.question}>
              <span>{item.question}</span>
              <div className={styles.arrow} />
            </div>
            <div className={styles.answer}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.askQuestion}>
        <p>Остались вопросы?</p>
        <button onClick={handleFormOpen} className={styles.askButton}>
          Задать вопрос
        </button>
      </div>
      <QuestionForm isOpen={isFormOpen} onClose={handleFormClose} />
    </section>
  );
}; 