// import SectionTitle from "../../ui/SectionTitle/SectionTitle";

// const ContactUs = () => {
//   return (
//     <section className="contacts">
//       <div className="container">
//         <SectionTitle
//           className="section-title contacts__title"
//           marginBottom="20px"
//           title="Contact Us"
//           align="center"
//         />
//         <p className="contacts__text item-title">
//           Feel free to contact us with questions, potencial partnerships or
//           media inquiries
//         </p>
//         <form action="#" className="form">
//           <input type="text" className="form__input" placeholder="Name" />
//           <input type="email" className="form__input" placeholder="E-mail" />
//           <textarea
//             className="form__textarea"
//             placeholder="Your text"
//           ></textarea>
//           <button className="form__btn" type="submit">
//             SUBMIT
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default ContactUs


import { useState } from "react";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid e-mail format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      // Здесь можно отправить данные на сервер
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <section className="contacts">
      <div className="container">
        <SectionTitle
          className="section-title contacts__title"
          marginBottom="20px"
          title="Contact Us"
          align="center"
        />
        <p className="contacts__text item-title">
          Feel free to contact us with questions, potential partnerships or
          media inquiries
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            className="form__input"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <textarea
            name="message"
            className="form__textarea"
            placeholder="Your text"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}

          <button className="form__btn" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
