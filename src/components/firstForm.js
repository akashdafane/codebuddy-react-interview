import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import actionConstants from '../store/actionConstants';
import formContext from '../store/formContextAPI';
import styles from '../styles/form.module.css';
import FooterAction from './FooterFormButtons';
import { Input } from './common.js';
import { Constants, RegexConstants, ValidationMessages } from '../constants';
import { CustomPasswordValidationRules } from '../utility/helper';

const FirstForm = forwardRef((props, ref) => {
  const { formData, dispatch } = useContext(formContext);
  const { isBackDisabled } = formData[0];

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // destructue regexConstant
  const { emailRegex, lowerCaseRegex, onlyNumberRegex, specialCharRegex, upperCaseRegex } =
    RegexConstants || {};

  // destructure errorMessageConstant
  const { emailValidationMessage, passwordValidationMessage } = ValidationMessages || {};

  // destructure lableConstants
  const { secondBtnLabel, thirdBtnLabel } = Constants || {};

  // destructure actionConstants
  const { UPDATE_EMAIL, UPDATE_PASSWORD } = actionConstants || {};

  // // this function is responsiable for handeling emailValidation
  const emailValidation = () => {
    const { email } = formData[0]?.data;
    return emailRegex.test(email);
  };

  // this function is responsiable for handeling passwordValidation
  const passwordValidation = () => {
    const { password } = formData[0]?.data;
    if (password && password.match(specialCharRegex)?.length > 1)
      CustomPasswordValidationRules.specialChar = true;
    if (password && password.match(onlyNumberRegex)?.length > 1)
      CustomPasswordValidationRules.number = true;
    if (password && password.match(upperCaseRegex)?.length > 1)
      CustomPasswordValidationRules.upperCase = true;
    if (password && password.match(lowerCaseRegex)?.length > 1)
      CustomPasswordValidationRules.lowerCase = true;
    const res = Object.values(CustomPasswordValidationRules).every(item => item === true);
    if (res) {
      return res;
    }

    return false;
  };

  const onSubmit = type => {
    const { email, password } = formData[0]?.data;
    if (!emailValidation()) {
      setEmailError(emailValidationMessage);
    } else setEmailError(false);
    if (!passwordValidation()) {
      setPasswordError(passwordValidationMessage);
    } else setPasswordError(false);

    if (emailValidation() && passwordValidation()) {
      if (type === thirdBtnLabel) {
        dispatch({
          type: 'COMPLETE',
          id: 1,
          show: false,
          next: 3,
          data: { email, password },
        });
      } else {
        dispatch({
          type: 'COMPLETE',
          id: 1,
          show: false,
          next: type === secondBtnLabel ? 2 : 1,
          data: { email, password },
        });
      }
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      onSubmit,
    }),
    [],
  );

  const handleEmail = e => {
    dispatch({ type: UPDATE_EMAIL, email: e?.target?.value, id: 1 });
  };

  const handlePassword = e => {
    dispatch({ type: UPDATE_PASSWORD, password: e?.target?.value, id: 1 });
  };

  const { email, password } = formData[0]?.data;

  return (
    <Container>
      <Form className={styles.form_main}>
        <div className={styles.input_group}>
          <Input
            onChange={handleEmail}
            type="email"
            value={email}
            label="Email"
            error={emailError}
            isRequired
            placeholder="Enter Email here.."
          />
        </div>
        <div className={styles.input_group}>
          <Input
            onChange={handlePassword}
            type="password"
            value={password}
            label="Password"
            error={passwordError}
            isRequired
            placeholder="Enter Password here.."
          />
        </div>
        <FooterAction disabled={isBackDisabled} onSubmit={onSubmit} />
      </Form>
    </Container>
  );
});

export default FirstForm;
