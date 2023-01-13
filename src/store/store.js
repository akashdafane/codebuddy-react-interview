import actionConstants from './actionConstants';

const {
  COMPLETE,
  UPDATE_ADDRESS,
  UPDATE_COUNTRY_CODE,
  UPDATE_EMAIL,
  UPDATE_FIRSTNAME,
  UPDATE_LASTNAME,
  UPDATE_PASSWORD,
  UPDATE_PHONE_NUMBER,
  UPDATE_TERMSANDCONDITION,
} = actionConstants || {};

const update = (state, action) => {
  const { next, data, id } = action;
  const newList = state.map(item => {
    if (item.id === id) {
      if (data) {
        return { ...item, show: false, data };
      }
    }

    return { ...item, show: false };
  });

  let newArr = [];

  if (newList?.length > 0) {
    newArr = newList.map(item => {
      if (item.id === next) {
        return { ...item, show: true };
      }

      return { ...item };
    });
  }

  return newArr;
};

const updateFirstName = (state, action) => {
  const { id, fname } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, fname } };
    }

    return { ...item };
  });
};

const updateLastName = (state, action) => {
  const { id, lname } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, lname } };
    }

    return { ...item };
  });
};

const updateAddress = (state, action) => {
  const { id, address } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, address } };
    }

    return { ...item };
  });
};

const updateEmail = (state, action) => {
  const { id, email } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, email } };
    }

    return { ...item };
  });
};

const updatePassword = (state, action) => {
  const { id, password } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, password } };
    }

    return { ...item };
  });
};

const updateCountryCode = (state, action) => {
  const { id, countryCode } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, countryCode } };
    }

    return { ...item };
  });
};

const updatePhoneNumber = (state, action) => {
  const { id, phoneNumber } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, phoneNumber } };
    }

    return { ...item };
  });
};

const updateTermsAndConditions = (state, action) => {
  const { id, tc } = action;
  return state.map(item => {
    if (item.id === id) {
      return { ...item, data: { ...item.data, tc } };
    }

    return { ...item };
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case COMPLETE:
      return update(state, action);
    case UPDATE_FIRSTNAME:
      return updateFirstName(state, action);
    case UPDATE_LASTNAME:
      return updateLastName(state, action);
    case UPDATE_ADDRESS:
      return updateAddress(state, action);
    case UPDATE_EMAIL:
      return updateEmail(state, action);
    case UPDATE_PASSWORD:
      return updatePassword(state, action);
    case UPDATE_COUNTRY_CODE:
      return updateCountryCode(state, action);
    case UPDATE_PHONE_NUMBER:
      return updatePhoneNumber(state, action);
    case UPDATE_TERMSANDCONDITION:
      return updateTermsAndConditions(state, action);
    default:
      return state;
  }
};

export default reducer;
