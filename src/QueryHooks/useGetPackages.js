import { useQuery, gql } from "@apollo/client";

const GET_PACKAGES = gql`
  query PaginationInput($skip: Int!) {
    getPackages(pagination: { skip: $skip, limit: 4 }) {
      statusCode
      message
      result {
        count
        packages {
          uid
          title
          startingPrice
          images {
            url
            name
          }
          duration
          loyalityPoint
          description
        }
      }
    }
  }
`;

export const useGetPackages = (skip) => {
  const { data, error, loading, fetchMore } = useQuery(GET_PACKAGES, {
    variables: {
      skip,
    },
  });

  const getPackages = {
    data,
    error,
    loading,
    fetchMore,
  };
  return getPackages;
};
