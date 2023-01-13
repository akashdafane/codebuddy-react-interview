import styles from '../styles/form.module.css';
import Constants from '../constants/constants';
import { Button } from './common.js';

const FooterFormButtons = ({
  handleBack,
  onSubmit,
  disabled,
  saveAndNetBtnLabel = Constants.footerBtnLabel.secondSaveBtnLabel,
  backBtnLabel = Constants.footerBtnLabel.backBtnLabel,
  SaveBtnLabel = Constants.footerBtnLabel.firstSaveBtnLabel,
}) => (
  <div className={styles.actions}>
    <Button disabled={disabled} type="button" onClick={handleBack} label={backBtnLabel} />
    <Button type="button" onClick={() => onSubmit(Constants.firstBtnLabel)} label={SaveBtnLabel} />
    <Button
      onClick={() => onSubmit(Constants.secondBtnLabel)}
      type="button"
      label={saveAndNetBtnLabel}
    />
  </div>
);

export default FooterFormButtons;
