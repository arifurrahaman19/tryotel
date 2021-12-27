import { useMutation, gql } from "@apollo/client";

const GET_AUTHENTICATION = gql`
  mutation {
    loginClient(
      auth: {
        email: "devteam@saimonglobal.com"
        deviceUuid: "7026a238-d078-48b5-862b-c3c7d21d8712"
      }
      password: "12345678"
    ) {
      message
      statusCode
      result {
        token
        refreshToken
        expiresAt
      }
    }
  }
`;

export const useAuth = () => {
  const [loginFunc, { data, error, loading }] = useMutation(GET_AUTHENTICATION);
  const loginData = {
    data,
    error,
    loading,
  };
  return { loginFunc, loginData };
};
