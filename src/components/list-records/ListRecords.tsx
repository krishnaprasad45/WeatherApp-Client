import React, { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";
import WeatherData from "../../Interfaces/weatherInterface";
import { userAxios } from "../../Constraints/axiosInterceptor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { debounce } from "lodash";

const ListRecords: React.FC = React.memo(() => {
  const [records, setRecords] = useState<WeatherData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    userAxios
      .get("/get/history")
      .then((response: { data: WeatherData[] }) => {
        setRecords(response.data);
      })
      .catch((error: unknown) => {
        console.error("Error fetching records:", error);
      });
  }, []);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  const handleStartDateChange = useCallback((date: Date) => {
    setStartDate(date);
  }, []);

  const handleEndDateChange = useCallback((date: Date) => {
    setEndDate(date);
  }, []);

  const filterDate = useCallback((date: Date): boolean => {
    if (!startDate) return true;
    const diffTime = Math.abs(date.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }, [startDate]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const recordDate = new Date(record.createdAt);
      const isWithinDateRange =
        (!startDate || recordDate >= startDate) &&
        (!endDate || recordDate <= endDate);

      const matchesSearchTerm = Object.values(record).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return isWithinDateRange && matchesSearchTerm;
    });
  }, [records, searchTerm, startDate, endDate]);

  return (
    <div>
      <div className="bg-blue-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold ml-2">HISTORY</h1>
          <div className="flex ml-auto">
            <label htmlFor="search" className="sr-only">
              Records
            </label>
            <div className="flex">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="From"
                className="border rounded-l py-2 px-4"
                filterDate={filterDate}
                isClearable
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="To"
                className="border rounded-l py-2 px-4"
                filterDate={filterDate}
                isClearable
              />
            </div>
            <input
              type="search"
              placeholder="Search Records"
              className="border rounded-l py-2 px-4 mr-2"
              name="search"
              id="search"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3">
                Temperature
              </th>
              <th scope="col" className="px-6 py-3">
                Celsius
              </th>
              <th scope="col" className="px-6 py-3">
                Humidity
              </th>
              <th scope="col" className="px-6 py-3">
                Pressure
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Wind Speed
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span>{record.name}</span>
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <p>{new Date(record.createdAt).toLocaleString()}</p>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{record.main.temp}°C</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{record.main.feels_like}</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{record.main.humidity}%</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{record.main.pressure}hPa</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{record.weather[0].description}</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>{record.wind.speed} m/s</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ListRecords;
