import { useReducer, useRef } from 'react';
import FirstForm from './firstForm';
import SecondForm from './secondForm';
import ThirdForm from './thirdForm';
import reducer from '../store/store';
import styles from '../styles/form.module.css';
import formContext from '../store/formContextAPI';
import Tabs from './Tabs';
import Constants from '../constants/constants';
import { forms } from '../utility/helper';

function Dashboard() {
  const firstFormRef = useRef(null);
  const secondFormRef = useRef(null);
  const thirdFormRef = useRef(null);

  const [formData, dispatch] = useReducer(reducer, forms);

  const handleFirstForm = () => {
    if (secondFormRef.current) secondFormRef.current.onSubmit(Constants.secondBtnLabel);
    else if (thirdFormRef.current) thirdFormRef.current.onSubmit(Constants.thirdBtnLabel);
  };

  const handleSecondForm = () => {
    if (firstFormRef.current) firstFormRef.current.onSubmit(Constants.secondBtnLabel);
    else if (thirdFormRef.current) thirdFormRef.current.handleBack();
  };

  const handleThirdFrom = () => {
    if (secondFormRef.current) secondFormRef.current.onSubmit(Constants.secondBtnLabel);
    else if (firstFormRef.current) firstFormRef.current.onSubmit(Constants.thirdBtnLabel);
  };

  return (
    <formContext.Provider value={{ dispatch, formData }}>
      <div className={styles.form_main_wrapper}>
        <Tabs
          handleFirstForm={handleFirstForm}
          handleSecondForm={handleSecondForm}
          handleThirdFrom={handleThirdFrom}
        />
        {formData.map(form => {
          if (form.show === true) {
            switch (form.id) {
              case 1:
                return <FirstForm ref={firstFormRef} key={`form_${form.id}`} />;
              case 2:
                return <SecondForm ref={secondFormRef} key={`form_${form.id}`} />;
              default:
                return <ThirdForm ref={thirdFormRef} key={`form_${form.id}`} />;
            }
          } else return null;
        })}
      </div>
    </formContext.Provider>
  );
}

export default Dashboard;
