import React, { ChangeEvent, FocusEvent } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  name?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onBlur,
  autoComplete,
  name
}) => {
  const containerClasses = [
    styles.container,
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    error ? styles.hasError : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        className={styles.input}
      />
      {(error || helperText) && (
        <div className={error ? styles.error : styles.helperText}>
          {error || helperText}
        </div>
      )}
    </div>
  );
}; 