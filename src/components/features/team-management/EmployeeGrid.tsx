import Link from "next/link";
import { motion } from "framer-motion";
import { Employee } from "@/types/teamManagement.types";
import { EmployeeCard } from "./EmployeeCard";

type EmployeeGridProps = {
  employees: Employee[];
  currentPage: number;
  itemsPerPage: number;
};

export const EmployeeGrid = ({
  employees,
  currentPage,
  itemsPerPage,
}: EmployeeGridProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
    >
      {currentEmployees.map((employee) => (
        <motion.div variants={itemVariants} key={employee.id}>
          <Link href={`/app/team-management/${employee.id}`}>
            <EmployeeCard employee={employee} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};
