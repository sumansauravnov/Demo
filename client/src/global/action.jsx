export const FORGOT_EMAIL = "FORGOT_EMAIL";

export const forgotEmail = (payload) => {
  return {
    type: FORGOT_EMAIL,
    payload,
  };
};
