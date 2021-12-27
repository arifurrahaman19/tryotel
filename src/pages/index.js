import Head from "next/head";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPackages } from "../QueryHooks/useGetPackages";
import { useAuth } from "../QueryHooks/useAuth";
import { useGetDiscount } from "../QueryHooks/useGetDiscount";
import PackageCard from "../components/PackageCard";
import NavigationHeader from "../components/NavigationHeader";

export default function Home() {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 4,
  });

  const { loginFunc, loginData } = useAuth();

  //Query for get packages
  const getPackages = useGetPackages(pagination.skip, pagination.limit);

  const { fetchMore } = getPackages;
  const packagesData = getPackages?.data?.getPackages?.result;

  if (loginData?.data && !loginData?.loading) {
    const token = loginData.data?.loginClient?.result.token;
    sessionStorage.setItem("TOKEN", token);
  }

  function fetchMoreData() {
    fetchMore({
      variables: {
        skip: pagination.skip + 4,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        fetchMoreResult.getPackages.result.packages = [
          ...previousResult.getPackages.result.packages,
          ...fetchMoreResult.getPackages.result.packages,
        ];

        return fetchMoreResult;
      },
    });
  }

  useEffect(() => {
    loginFunc();
  }, []);

  return (
    <>
      <Head>
        <title>FLIGHT LOCAL | Tryotel Travels</title>
      </Head>

      {getPackages?.loading ? (
        <p>Loading...</p>
      ) : (
        <div className="homeWrapper">
          <NavigationHeader />

          <div className="container">
            <div className="holidays">
              <h2>{packagesData?.count} Available Holidays</h2>
            </div>

            <InfiniteScroll
              dataLength={packagesData?.count}
              next={fetchMoreData}
              hasMore={true}
            >
              {packagesData?.packages.map((pack) => {
                return <PackageCard pack={pack} key={pack?.uid} />;
              })}
            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
}
