import { Form, InputGroup } from 'react-bootstrap';
import Button from './button';

const Input = ({
  controlId,
  label,
  type,
  placeholder,
  error,
  inputRef,
  name,
  disabled,
  onChange,
  buttonLabel,
  isLoading,
  isButtonDisabled,
  onButtonClick,
  isRequired,
  value,
  isControlled,
  iconClass,
  buttonVariant,
  hasButton,
  buttonType,
  prependText,
  hintText,
  onPaste,
}) => (
  <Form.Group controlId={controlId}>
    {label && (
      <Form.Label>
        {label}
        {isRequired && <span className="required"> *</span>}
        {hintText && <span className="input-example">{hintText}</span>}
      </Form.Label>
    )}
    <InputGroup>
      <Form.Control
        onPaste={onPaste}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={inputRef}
        disabled={disabled}
        onChange={onChange}
        value={value}
        {...(isControlled ? { value } : {})}
      />
      {(buttonLabel || iconClass) && (
        <InputGroup.Append>
          {hasButton && (
            <Button
              disabled={isButtonDisabled}
              isLoading={isLoading}
              label={buttonLabel}
              onClick={onButtonClick}
              variant={buttonVariant}
              iconClass={iconClass}
              type={buttonType}
            />
          )}
          {!hasButton && iconClass && <i className={iconClass} />}
        </InputGroup.Append>
      )}
      {prependText && <span className="numbers">{prependText}</span>}
    </InputGroup>
    {error && <Form.Text className="error">{error}</Form.Text>}
  </Form.Group>
);

export default Input;
