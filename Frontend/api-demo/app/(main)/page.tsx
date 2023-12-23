import { auth, redirectToSignIn } from "@clerk/nextjs";

import { ApiCard } from "./_components/api-card";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const MainPage = async () => {
  const { userId, getToken } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  let data = {} as WeatherForecast[];
  const token = await getToken();

  const url = `${process.env.API_URL}/WeatherForecast`;

  try {
    const weatherForecast = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (weatherForecast.ok) {
      data = (await weatherForecast.json()) as WeatherForecast[];
    }
  } catch (error) {
    console.log("[REQUEST_FAILED]", error);
  }

  return (
    <div className="flex items-center justify-center pt-14 w-full h-full">
      <ApiCard datas={data} />
    </div>
  );
};

export default MainPage;
