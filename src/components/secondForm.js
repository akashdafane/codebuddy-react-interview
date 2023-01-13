import { useState, useContext, forwardRef, useImperativeHandle } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import actionConstants from '../store/actionConstants';
import formContext from '../store/formContextAPI';
import styles from '../styles/form.module.css';
import { Input } from './common.js';
import { Constants, RegexConstants, ValidationMessages } from '../constants';
import FooterAction from './FooterFormButtons';

const SecondForm = forwardRef((props, ref) => {
  const { formData, dispatch } = useContext(formContext);

  const [firstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  // destructue regexConstant
  const { characterRegex } = RegexConstants || {};

  // destructure lableConstants
  const { secondBtnLabel } = Constants || {};

  // destructure errorMessageConstant
  const { addressLength, onlyAlpabets } = ValidationMessages || {};

  // destructure actionConstants
  const { UPDATE_FIRSTNAME, UPDATE_LASTNAME, UPDATE_ADDRESS } = actionConstants || {};

  // this function will handle firstName validation
  const firstNameValidation = () => {
    const { fname } = formData[1]?.data;
    const checkFirstName = fname?.match(characterRegex);
    const len = checkFirstName?.length;
    if (len && len >= 2 && len <= 50) {
      return true;
    }

    return false;
  };

  // this function will handle lastName validation
  const lastNameValidation = () => {
    const { lname } = formData[1]?.data;
    const checkLastName = lname?.match(characterRegex);
    const len = checkLastName?.length;
    if (lname === '') {
      return true;
    }

    if (len && len >= 2 && len <= 50) {
      return true;
    }

    return false;
  };

  // this function will handle address field validation
  const addressValidation = () => {
    const { address } = formData[1]?.data;
    const checkAddress = address?.match(characterRegex);
    const len = checkAddress?.length;
    if (len && len > 9) {
      return true;
    }

    return false;
  };

  const handleFirstName = e => {
    dispatch({ type: UPDATE_FIRSTNAME, fname: e?.target?.value, id: 2 });
  };

  const handleLastName = e => {
    dispatch({ type: UPDATE_LASTNAME, lname: e?.target?.value, id: 2 });
  };

  const handleAddress = e => {
    dispatch({ type: UPDATE_ADDRESS, address: e?.target?.value, id: 2 });
  };

  const handleBack = () => {
    dispatch({ type: 'COMPLETE', id: 2, show: false, next: 1 });
  };

  const onSubmit = type => {
    const { fname, lname, address } = formData[1]?.data;
    if (!firstNameValidation()) {
      setFirstNameError(onlyAlpabets);
    } else setFirstNameError('');

    if (!lastNameValidation()) {
      setLastNameError(onlyAlpabets);
    } else setLastNameError('');
    if (!addressValidation()) {
      setAddressError(addressLength);
    } else setAddressError('');

    if (firstNameValidation() && lastNameValidation && addressValidation()) {
      dispatch({
        type: 'COMPLETE',
        id: 2,
        show: false,
        next: type === secondBtnLabel ? 3 : 2,
        data: { fname, lname, address },
      });
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      onSubmit,
    }),
    [],
  );

  const { fname, lname, address } = formData[1]?.data;

  return (
    <Container>
      <Form className={styles.form_main}>
        <div className={styles.input_group}>
          <Input
            onChange={handleFirstName}
            type="text"
            value={fname}
            label="First name"
            error={firstNameError}
            isRequired
            placeholder="Enter first name "
          />
        </div>
        <div className={styles.input_group}>
          <Input
            onChange={handleLastName}
            type="text"
            value={lname}
            label="Last Name"
            error={LastNameError}
            isRequired
            placeholder="Enter last name"
          />
        </div>
        <div className={styles.input_group}>
          <Input
            onChange={handleAddress}
            type="text"
            value={address}
            label="Address"
            error={addressError}
            isRequired
            placeholder="Enter address"
          />
        </div>
        <FooterAction handleBack={handleBack} onSubmit={onSubmit} />
      </Form>
    </Container>
  );
});

export default SecondForm;
