"use client";

import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface ApiCardProps {
  datas: WeatherForecast[] | null;
}

export const ApiCard = ({ datas }: ApiCardProps) => {
  const router = useRouter();

  const onClick = () => {
    router.refresh();
  };

  return (
    <div className="bg-secondary rounded-2xl w-[50%] h-auto p-3 border border-black">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-xl">Make an API call</div>
        <Button onClick={onClick} className="w-auto h-auto">
          <RefreshCcw className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col">
        <Table>
          <TableCaption>Weather Forecast Report</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Temp Celcius</TableHead>
              <TableHead>Temp Fahrenheit</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas?.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium truncate">
                  {data?.date}
                </TableCell>
                <TableCell className="truncate">{data?.temperatureC}</TableCell>
                <TableCell className="truncate">{data?.temperatureF}</TableCell>
                <TableCell className="truncate">{data?.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
