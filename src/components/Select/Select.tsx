import React, { useState } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
  price?: number;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, placeholder = 'Выберите значение' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={styles.select}>
      <div className={styles.selectWrapper}>
        <button
          className={styles.selectButton}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {selectedOption ? `${selectedOption.label}${selectedOption.price ? ` (${selectedOption.price}₽)` : ''}` : placeholder}
          <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</span>
        </button>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option) => (
              <button
                key={option.value}
                className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                onClick={() => handleSelect(option)}
                type="button"
              >
                {option.label} {option.price ? `(${option.price}₽)` : ''}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select; 