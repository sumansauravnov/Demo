export const FORGOT_EMAIL = "FORGOT_EMAIL";
export const REFRESHER = "REFRESHER";

export const forgotEmail = (payload) => {
  return {
    type: FORGOT_EMAIL,
    payload,
  };
};

export const refreshers = (payload) => {
  return {
    type: REFRESHER,
    payload,
  };
};
