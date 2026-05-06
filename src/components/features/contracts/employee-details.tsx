"use client";
import SVGIcon from "@/components/shared/common/svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EmployeeDetails() {
  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label htmlFor="first_name">First name</Label>
          <Input
            className="bg-[#F5F6F7]"
            type="text"
            id="first_name"
            placeholder="John"
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Last name</Label>
          <Input
            className="bg-[#F5F6F7]"
            type="text"
            id="last_name"
            placeholder="Doe"
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="email">Email address</Label>
          <Input
            className="bg-[#F5F6F7]"
            type="email"
            id="email"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <div className="flex items-center gap-2">
            <SelectCountryCode />
            <Input className="bg-[#F5F6F7]" type="text" placeholder="+234" />
          </div>
        </div>

        <div>
          <Label htmlFor="website">Country</Label>
          <SelectCountry />
        </div>
        <div>
          <Label htmlFor="visitors">Address</Label>
          <Input
            className="bg-[#F5F6F7]"
            id="visitors"
            placeholder=""
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">City</Label>
          <Input className="bg-[#F5F6F7]" />
        </div>
        <div className="mb-6">
          <Label htmlFor="confirm_password">Postal/Zip code</Label>
          <Input className="bg-[#F5F6F7]" />
        </div>
      </div>
    </>
  );
}

function SelectCountryCode() {
  return (
    <Select>
      <SelectTrigger className="py-3 px-2 bg-[#F5F6F7]">
        <SelectValue placeholder={<SVGIcon iconName="../nigeria.svg" />} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="+234">
            <SVGIcon iconName="../nigeria.svg" />
          </SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function SelectCountry() {
  return (
    <Select>
      <SelectTrigger className="py-3 px-2 w-full bg-[#F5F6F7]">
        <SelectValue placeholder="--" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="af">Afghanistan</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
