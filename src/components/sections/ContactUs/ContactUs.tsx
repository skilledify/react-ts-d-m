import React from 'react';
import SectionTitle from '../../ui/SectionTitle/SectionTitle';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ContactUs.module.css';

const formSchema = z.object({
  username: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .email('Введите корректный email'),
  message: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .min(10, 'Сообщение должно содержать минимум 10 символов'),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit', // 👈 Проверка запускается только при нажатии на кнопку "Отправить"
    defaultValues: {
      username: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Отправляемые данные:', data);

    // 👈 Явный сброс значений к пустым строкам
    reset({
      username: '',
      email: '',
      message: '',
    });
  };

  return (
    <section className={styles.contacts}>
      <SectionTitle
        className="section-title"
        title="Contact Us"
        align="center"
        marginBottom="50px"
      />
      <p className={`${styles.contactsText} item-title`}>
        Feel free to contact us with questions, potential partnerships or media inquiries
      </p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username */}
        <div className={styles.fieldGroup}>
          <input
            id="username"
            placeholder="Ваше имя *"
            className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
            {...register('username')}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>

        {/* Email */}
        <div className={styles.fieldGroup}>
          <input
            id="email"
            type="email"
            placeholder="Ваш Email *"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        {/* Message */}
        <div className={styles.fieldGroupFull}>
          <textarea
            id="message"
            placeholder="Ваше сообщение *"
            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            {...register('message')}
          />
          {errors.message && (
            <span className={styles.error}>{errors.message.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.btn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </form>
    </section>
  );
};

export default ContactUs;