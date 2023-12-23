"use client";
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

interface ApiCardProps {
  datas: WeatherForecast[] | null;
}

export const ApiCard = ({ datas }: ApiCardProps) => {
  return (
    <div className="bg-secondary rounded-xl w-[50%] h-auto p-2">
      <div className="font-semibold text-xl">Make an API call</div>
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
            {datas?.map((data) => (
              <TableRow>
                <TableCell className="font-medium">{data?.date}</TableCell>
                <TableCell>{data?.temperatureC}</TableCell>
                <TableCell>{data?.temperatureF}</TableCell>
                <TableCell>{data?.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
