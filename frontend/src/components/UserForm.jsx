import { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  role: 'developer',
  newsletter: false,
};

function UserForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [requestError, setRequestError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'age' && value !== ''
            ? Number(value)
            : value,
    }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
    setSuccessMessage('');
    setRequestError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setRequestError('');

    const nextErrors = {};
    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'A vezetéknév megadása kötelező.';
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'A keresztnév megadása kötelező.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Az e-mail-cím megadása kötelező.';
    } else if (!formData.email.includes('@')) {
      nextErrors.email = 'Az e-mail-címnek tartalmaznia kell egy @ jelet.';
    }
    if (
      formData.age !== '' &&
      (!Number.isFinite(formData.age) || formData.age <= 0)
    ) {
      nextErrors.age = 'Az életkornak 0-nál nagyobbnak kell lennie.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/users', {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        age: formData.age === '' ? null : formData.age,
      });
      setSuccessMessage('A profil sikeresen elküldve.');
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Hiba a profil beküldésekor:', error);
      setRequestError(
        'Nem sikerült elküldeni az űrlapot. Ellenőrizd az adatokat, majd próbáld újra.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="user-form">
      <h1>Felhasználói profil</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="firstName">Vezetéknév</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="family-name"
          value={formData.firstName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
        />
        {errors.firstName && (
          <p id="firstName-error" className="user-form__field-error">
            {errors.firstName}
          </p>
        )}

        <label htmlFor="lastName">Keresztnév</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="given-name"
          value={formData.lastName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.lastName)}
          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
        />
        {errors.lastName && (
          <p id="lastName-error" className="user-form__field-error">
            {errors.lastName}
          </p>
        )}

        <label htmlFor="email">E-mail-cím</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="user-form__field-error">
            {errors.email}
          </p>
        )}

        <label htmlFor="age">Életkor (opcionális)</label>
        <input
          id="age"
          name="age"
          type="number"
          min="0"
          step="any"
          value={formData.age}
          onChange={handleChange}
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        {errors.age && (
          <p id="age-error" className="user-form__field-error">
            {errors.age}
          </p>
        )}

        <label htmlFor="role">Szerepkör</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="developer">Fejlesztő</option>
          <option value="designer">Designer</option>
          <option value="manager">Projektmenedzser</option>
        </select>

        <label className="user-form__checkbox" htmlFor="newsletter">
          <input
            id="newsletter"
            name="newsletter"
            type="checkbox"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          Hírlevélre feliratkozom
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Küldés...' : 'Profil beküldése'}
        </button>

        {loading && (
          <p className="user-form__status" role="status">
            Az űrlap küldése folyamatban...
          </p>
        )}
        {successMessage && (
          <p className="user-form__status" role="status">
            {successMessage}
          </p>
        )}
        {requestError && (
          <p className="user-form__request-error" role="alert">
            {requestError}
          </p>
        )}
      </form>
    </section>
  );
}

export default UserForm;
