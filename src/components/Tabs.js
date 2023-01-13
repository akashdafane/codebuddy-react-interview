import styles from '../styles/tabNavigation.module.css';
import { Button } from './common.js';
import Constants from '../constants/constants';

function Tabs({ handleFirstForm, handleSecondForm, handleThirdFrom }) {
  const { tabLabel } = Constants || {};
  const { formOneLabel, formTwoLabel, formThreeLabel } = tabLabel || {};

  return (
    <div className={styles.steps_wrapper}>
      <Button onClick={handleFirstForm} type="button" label={formOneLabel} variant="secondary" />

      <Button onClick={handleSecondForm} type="button" label={formTwoLabel} variant="secondary" />

      <Button onClick={handleThirdFrom} type="button" label={formThreeLabel} variant="secondary" />
    </div>
  );
}

export default Tabs;
