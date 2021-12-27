import { useQuery, gql } from "@apollo/client";

const GET_DISCOUNT = gql`
  query {
    getDiscounts {
      statusCode
      message
      result {
        count
        discounts {
          discount {
            value
          }
        }
      }
    }
  }
`;

export const useGetDiscount = () => {
  const { data, error, loading } = useQuery(GET_DISCOUNT);
  const getDiscount = {
    data,
    error,
    loading,
  };
  return getDiscount;
};
