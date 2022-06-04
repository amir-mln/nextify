import fetcher from "lib/fetcher";
import useSWR from "swr";

type CustomSwrUrl = Parameters<typeof fetcher>["0"];
type CustomSwrFetcherData = Parameters<typeof fetcher>["1"];

function useCustomSWR<SwrData>(url: CustomSwrUrl, fetcherData?: CustomSwrFetcherData) {
  const { data, error } = useSWR<SwrData>(url, {
    revalidateOnFocus: false,
    fetcher: (swrUrl: CustomSwrUrl) => fetcher(swrUrl, fetcherData),
  });

  return { data, error, loading: !data && !error };
}

export default useCustomSWR;
