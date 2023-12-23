import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Server } from "lucide-react";
import { notFound } from "next/navigation";

import { ApiCard } from "./_components/api-card";

const MainPage = async () => {
  const { userId, getToken } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  let data = [] as WeatherForecast[];
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
    } else {
      notFound();
    }
  } catch (error) {
    console.log("[REQUEST_FAILED]", error);
    data = [];
  }

  return (
    <div className="flex flex-col items-center pt-14 w-full h-full">
      <h1 className="pt-20 my-4 text-xl font-semibold flex items-center gap-x-2">
        <Server className="h-6 w-6" />
        API Calls to an ASP.NET Core API
      </h1>
      <ApiCard datas={data} />
    </div>
  );
};

export default MainPage;
