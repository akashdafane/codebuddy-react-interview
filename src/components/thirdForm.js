import { useState, useContext, useImperativeHandle, forwardRef } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import actionConstants from '../store/actionConstants';
import formContext from '../store/formContextAPI';
import styles from '../styles/form.module.css';
import { Input } from './common.js';
import FooterAction from './FooterFormButtons';
import { Constants, ValidationMessages, RegexConstants } from '../constants';

const ThirdForm = forwardRef((props, ref) => {
  const { formData, dispatch } = useContext(formContext);

  const [countryCodeError, setCountryCodeError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [termsConditionError, setTermsConditionError] = useState(false);
  const navigate = useNavigate();

  const { phoneNumberRegex } = RegexConstants || {};

  const { mobileNumberMessage } = ValidationMessages || {};

  const { thirdBtnLabel, secondBtnLabel, required } = Constants || {};

  const { UPDATE_COUNTRY_CODE, UPDATE_PHONE_NUMBER, UPDATE_TERMSANDCONDITION } =
    actionConstants || {};

  const mobileNumberValidation = () => {
    const { phoneNumber } = formData[2]?.data;
    const res = phoneNumber?.match(phoneNumberRegex);
    if (res?.length > 0) {
      if (parseInt(res[0], 10) !== 0 && res.length === 10) {
        return true;
      }

      return false;
    }

    return false;
  };

  const handleCountryCode = e => {
    dispatch({ type: UPDATE_COUNTRY_CODE, countryCode: e?.target?.value, id: 3 });
  };

  const handlePhoneNumber = e => {
    dispatch({ type: UPDATE_PHONE_NUMBER, phoneNumber: e?.target?.value, id: 3 });
  };

  const handleTc = e => {
    dispatch({ type: UPDATE_TERMSANDCONDITION, tc: e?.target?.checked, id: 3 });
  };

  const handleBack = () => {
    dispatch({ type: 'COMPLETE', id: 2, show: false, next: 2 });
  };

  const handleSubmit = () => {
    console.log('successfully submitted');
  };

  const handleError = err => {
    console.log('Error occured => ', err);
  };

  const serverSubmitRequest = async () => {
    const url = `${process.env.REACT_APP_API_URL}/submit`;

    fetch(url)
      .then(res => res.json())
      .then(data => handleSubmit(data))
      .catch(err => handleError(err));
  };

  const onSubmit = type => {
    const { countryCode, tc, phoneNumber } = formData[2]?.data;

    if (!mobileNumberValidation()) {
      setPhoneNumberError(mobileNumberMessage);
    } else {
      setPhoneNumberError('');
    }

    if (!tc) {
      setTermsConditionError(required);
    } else setTermsConditionError('');
    if (!countryCode) {
      setCountryCodeError(required);
    } else setCountryCodeError('');

    if (mobileNumberValidation() && tc && countryCode) {
      if (type === thirdBtnLabel) {
        dispatch({
          type: 'COMPLETE',
          id: 3,
          show: false,
          next: 1,
          data: { phoneNumber, countryCode, tc },
        });
      } else {
        dispatch({
          type: 'COMPLETE',
          id: 3,
          show: false,
          next: 3,
          data: { phoneNumber, countryCode, tc },
        });
      }

      serverSubmitRequest();
      if (type === secondBtnLabel) navigate('/posts');
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      handleBack,
      onSubmit,
    }),
    [],
  );

  const { countryCode, tc, phoneNumber } = formData[2]?.data;

  return (
    <Container>
      <Form className={styles.form_main}>
        <div className={styles.input_group}>
          <label htmlFor="country code">Country Code</label>
          <select onChange={handleCountryCode} value={countryCode}>
            <option value="">Select</option>
            <option value="india">India(+91)</option>
            <option value="america">America(+1)</option>
          </select>
          {countryCodeError ? <p className={styles.error}>{countryCodeError}</p> : null}
        </div>
        <div className={styles.input_group}>
          <Input
            onChange={handlePhoneNumber}
            maxLength="10"
            type="text"
            value={phoneNumber}
            error={phoneNumberError}
            label="Phone Number"
            isRequired
            placeholder="Enter phone number"
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="fname" className={styles.label_wrapper}>
            <input onChange={handleTc} type="checkbox" checked={tc} />
            Address
          </label>
          {termsConditionError ? <p className={styles.error}>{termsConditionError}</p> : null}
        </div>
        <FooterAction saveAndNetBtnLabel="Save All" handleBack={handleBack} onSubmit={onSubmit} />
      </Form>
    </Container>
  );
});

export default ThirdForm;
