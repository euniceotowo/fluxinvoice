"use client";

import { formatCurrency } from "@/utils/formatters";
import { Invoice } from "@/lib/data/invoices";
import Image from "next/image";
import { formatDateCustom, parseDateInput } from "@/utils/date";
import { addDays } from "date-fns";

// helpers
function calculateDueDate(issueDate: string): string {
  const parsed = parseDateInput(issueDate);
  if (!parsed) return "N/A";
  return formatDateCustom(addDays(parsed, 14), "d MMMM yyyy");
}

function calcBreakdown(amount: number) {
  const vatRate = 0.02;
  const subtotal = amount;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;
  return { subtotal, vat, total, vatRate };
}

function getCurrencyDetails(currencyName?: string) {
  const currency = (currencyName || "").trim().toUpperCase();
  if (currency === "USDT") {
    return { name: "USDT", icon: "/Tether.svg" };
  }
  if (currency === "USDC") {
    return { name: "USDC", icon: "/usdc.svg" };
  }
  if (currency === "BTC") {
    return { name: "BTC", icon: "/bitcoin.svg" };
  }
  if (currency === "ETH" || currency === "ETHEREUM") {
    return { name: "ETH", icon: "/eth.svg" };
  }
  if (currency === "XLM" || currency === "STELLAR") {
    return { name: "XLM", icon: "/stellar.svg" };
  }
  return { name: currency || "USDT", icon: "/Tether.svg" };
}

function getNetworkDetails(networkName?: string, paidIn?: string) {
  const net = (networkName || "").trim().toUpperCase();
  if (net === "STELLAR") {
    return { name: "Stellar", icon: "/stellar.svg" };
  }
  if (net === "ETHEREUM") {
    return { name: "Ethereum", icon: "/eth.svg" };
  }
  if (net === "POLYGON") {
    return { name: "Polygon", icon: "/eth.svg" };
  }
  if (net === "ARBITRUM") {
    return { name: "Arbitrum", icon: "/eth.svg" };
  }
  if (net === "OPTIMISM") {
    return { name: "Optimism", icon: "/eth.svg" };
  }

  const currency = (paidIn || "").trim().toUpperCase();
  if (currency === "XLM" || currency === "STELLAR") {
    return { name: "Stellar", icon: "/stellar.svg" };
  }
  return { name: "Ethereum", icon: "/eth.svg" };
}

interface Props {
  invoice: Invoice;
}

export default function InvoiceDetailsSection({ invoice }: Props) {
  const { subtotal, vat, total, vatRate } = calcBreakdown(invoice.amount);
  const dueDate = calculateDueDate(invoice.issueDate);
  const currencyDetails = getCurrencyDetails(invoice.paidIn);
  const networkDetails = getNetworkDetails(invoice.network as string | undefined, invoice.paidIn);

  const statusChip =
    invoice.status === "Pending"
      ? "border-[#E79A23] text-[#E79A23] bg-[#FEF7EB]"
      : invoice.status === "Overdue"
        ? "border-[#C64242] text-[#C64242] bg-[#FEECEC]"
        : invoice.status === "Paid"
          ? "border-[#26902B] text-[#26902B] bg-[#EDFEEC]"
          : invoice.status === "Approved"
            ? "border-[#6B7AFF] text-[#4751D6] bg-[#EEF0FF]"
            : "border-gray-300 text-gray-600 bg-gray-50";

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[852px] mx-auto mt-6">
      {/* ===== DETAILS ===== */}
      <div className="rounded-2xl bg-white border border-[#E9EAF0] shadow-sm p-5">
        <span className="inline-block bg-[#EAE6F7] text-[#6B5CD6] text-[11px] font-medium px-3 py-1 rounded-md mb-4">
          Details
        </span>

        {/* Status / Invoice no */}
        <div className="mb-3">
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-[#5D6B82] text-xs sm:text-sm px-3 sm:px-4 py-1 font-medium rounded-md">
            <p>Status</p>
            <p className="text-right">Invoice no</p>
          </div>
          <div className="grid grid-cols-2 items-center px-2 sm:px-3 py-2 border-[#E9EAF0]">
            <div>
              <span
                className={`inline-block px-2.5 py-1 text-[11px] font-medium rounded-full border ${statusChip}`}
              >
                {invoice.status}
              </span>
            </div>
            <p className="text-right font-medium text-gray-900 text-sm sm:text-base">
              {invoice.invoiceNo}
            </p>
          </div>
        </div>

        {/* Type / Paid in */}
        <div className="mb-4">
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-[#5D6B82] text-[13px] px-3 py-1 font-medium rounded-md">
            <p>Type</p>
            <p className="text-right">Paid in</p>
          </div>
          <div className="grid grid-cols-2 px-2 py-2 items-center">
            <p className="text-gray-800 text-[13px] sm:text-sm font-medium">
              Contract Monthly Payment
            </p>
            <div className="flex justify-end items-center gap-2">
              <Image src={currencyDetails.icon} alt={currencyDetails.name} width={18} height={18} />
              <p className="text-gray-800 text-[13px] sm:text-sm font-medium">
                {invoice.paidIn}
              </p>
            </div>
          </div>
        </div>

        {/* Title / Network */}
        <div className="mb-4">
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-[#5D6B82] text-[13px] px-3 py-1 font-medium rounded-md">
            <p>Title</p>
            <p className="text-right">Network</p>
          </div>
          <div className="grid grid-cols-2 px-2 py-2 items-center">
            <p className="text-gray-800 text-[13px] sm:text-sm font-medium">
              {invoice.title}
            </p>
            <div className="flex justify-end items-center gap-2">
              <Image
                src={networkDetails.icon}
                alt={networkDetails.name}
                width={18}
                height={18}
              />
              <p className="text-gray-800 text-[13px] sm:text-sm font-medium">
                {networkDetails.name}
              </p>
            </div>
          </div>
        </div>

        {/* Issue / Due */}
        <div>
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-[#5D6B82] text-[13px] px-3 py-1 font-medium rounded-md">
            <p>Issue Date</p>
            <p className="text-right">Due Date</p>
          </div>
          <div className="grid grid-cols-2 px-2 py-2">
            <p className="text-gray-800 text-[13px] sm:text-sm font-medium">
              {invoice.issueDate}
            </p>
            <p className="text-right text-gray-800 text-[13px] sm:text-sm font-medium">
              {dueDate}
            </p>
          </div>
        </div>
      </div>

      {/* ===== INVOICE BREAKDOWN ===== */}
      <div className="rounded-2xl bg-white border border-[#E9EAF0] shadow-sm p-5">
        <span className="inline-block bg-[#EAE6F7] text-[#6B5CD6] text-[11px] font-medium px-3 py-1 rounded-md mb-4">
          Invoice Breakdown
        </span>

        {/* Item 1 (label row has bg, values row plain; no borders, py-1 on labels) */}
        <div className="mb-5">
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-[#5D6B82] text-[13px] px-3 py-3 font-medium rounded-md">
            <p>Item Name</p>
            <p className="text-right text-gray-900 font-medium">
              {formatCurrency(subtotal, { currency: invoice.paidIn, isKobo: false })}
            </p>
          </div>
          <div className="grid grid-cols-2 px-3 pt-2 text-[#5D6B82] text-xs">
            <span />
            <p className="text-right">
              100 unit(s) at {formatCurrency(5, { currency: invoice.paidIn, isKobo: false })}
            </p>
          </div>
        </div>

        {/* Subtotal */}
        <div className="mb-5">
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-[#5D6B82] text-[13px] px-3 py-3 font-medium rounded-md">
            <p>Subtotal</p>
            <p className="text-right text-gray-900 font-medium">
              {formatCurrency(subtotal, { currency: invoice.paidIn, isKobo: false })}
            </p>
          </div>
        </div>

        {/* VAT */}
        <div className="mb-5">
          <div className="grid grid-cols-2 bg-white text-[#5D6B82] text-[13px] px-3 py-3 font-medium rounded-md">
            <p>VAT ({Math.round(vatRate * 100)}%)</p>
            <p className="text-right text-gray-900 font-medium">
              {formatCurrency(vat, { currency: invoice.paidIn, isKobo: false })}
            </p>
          </div>
        </div>

        {/* Total */}
        <div>
          <div className="grid grid-cols-2 bg-[#F5F6F7] text-gray-900 text-sm sm:text-base font-semibold px-3 py-3 rounded-md">
            <p>Total Amount</p>
            <p className="text-right">
              {formatCurrency(total, { currency: invoice.paidIn, isKobo: false })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
