
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ContactUs.module.css'; // 👈 Импорт CSS-модуля

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  email: z
    .string()
    .email({ message: 'Введите корректный email' }),
  age: z
    .number({ message: 'Введите число' })
    .min(18, { message: 'Возраст должен быть не менее 18 лет' }),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      age: 18,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Отправляемые данные:', data);
  };

  return (
    <section className={styles.contacts}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Поле Username */}
        <div className={styles.fieldGroup}>
          <input
            id="username"
            placeholder="Ваше имя"
            className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
            {...register('username')}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </div>

        {/* Поле Email */}
        <div className={styles.fieldGroup}>
          <input
            id="email"
            type="email"
            placeholder="Ваш Email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        {/* Поле Age */}
        <div className={styles.fieldGroupFull}>
          <input
            id="age"
            type="number"
            placeholder="Возраст"
            className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && (
            <span className={styles.error}>{errors.age.message}</span>
          )}
        </div>

        {/* Кнопка */}
        <button
          type="submit"
          className={styles.btn}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </section>
  );
};

export default ContactUs;