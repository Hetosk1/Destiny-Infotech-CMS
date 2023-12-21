import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo } from "react";
import Progress from "components/progress";


const ComplexTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="relative flex items-center justify-between pt-4 mt-0">
        <div class="text-xl font-bold text-navy-700 dark:text-white">
          Attendance List
        </div>
        {/* <CardMenu /> */}
      </div>

      <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table className="w-full">
          <thead className="text-start">
              <tr>
                  <th>
                    <p className="text-xs tracking-wide text-gray-600">
                      Date   
                    </p>
                  </th>
                  <th>
                    <p className="text-xs tracking-wide text-gray-600">
                      Status   
                    </p>
                  </th>
              </tr>
          </thead>
          <tbody >
                {tableData.forEach(data => {
                  <tr>
                    <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">{data.date}</p>
                    </td>
                    <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">{data.status}</p>
                    </td>                  
                  </tr>
                })}
                {/* <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">28-09-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr>
                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">29-09-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Absent</p>
                  </td>                  
                </tr>
                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">30-09-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr>                           
                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">31-09-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr>                     
                                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">01-10-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr>
                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">02-10-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr>
                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">03-10-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr>
                <tr>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">04-10-2005</p>
                  </td>
                  <td className="pt-[14px] pb-[18px] sm:text-[14px]">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">Present</p>
                  </td>                  
                </tr> */}

          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ComplexTable;
