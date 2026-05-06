"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  CalenderIcon,
  NotePadIcon,
  ReceiveIcon,
  SendIcon,
} from "@/../public/svg";

function QuickAction() {
  const actions = [
    {
      name: "Create contract",
      icon: <NotePadIcon />,

      action: () => {},
    },
    {
      name: "Create time-off",
      icon: <CalenderIcon />,
      action: () => {},
    },
    {
      name: "Withdraw",
      icon: <SendIcon />,
      action: () => {},
    },
    {
      name: "Fund wallet",
      icon: <ReceiveIcon />,
      action: () => {},
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="max-w-100 w-full sm:bg-white  rounded-lg p-4 gap-4 flex flex-col dark:sm:bg-gray-900">
      <p className="text-base font-medium text-text-header dark:text-gray-100">
        Quick actions
      </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-4 flex-wrap items-center"
      >
        {actions.map((action, index) => {
          return (
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={index}
              onClick={action.action}
              className="p-4 rounded-lg flex items-center gap-2 sm:bg-[#F3EBF9] bg-white text-base font-medium text-text-header w-fit shadow-sm hover:shadow transition-shadow dark:bg-gray-800 dark:text-gray-200 dark:sm:bg-gray-800"
            >
              {action.icon}
              <span>{action.name}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

export default QuickAction;
