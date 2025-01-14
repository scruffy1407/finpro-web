import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { JobHunter } from "@/pages/developer/manage-user";
import { format } from "date-fns";

interface UserTableProps {
  listUser: JobHunter[];
}
export function UserTable({ listUser }: UserTableProps) {
  function getPackageName(subscriptionId: number): string {
    switch (subscriptionId) {
      case 1:
        return "Free Plan";
      case 2:
        return "Standard Plan";
      case 3:
        return "Professional Plan";
      default:
        return "Unknown Plan";
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Photo</TableHead>
            <TableHead>Name & Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Subscription End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listUser.map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                <Image
                  src={user.photo || "/dummyProfile.png"}
                  alt={`${user.name}'s photo`}
                  width={50}
                  height={50}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </TableCell>
              <TableCell>
                <div className="font-bold text-neutral-950">{user.name}</div>
                <div className="text-sm text-muted-foreground text-neutral-400">
                  {user.email}
                </div>
              </TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className={`font-bold text-neutral-950`}>
                    {getPackageName(user.jobHunterSubscription.subscriptionId)}
                  </span>
                  <span className={"text-neutral-400"}>
                    {user.jobHunterSubscription.subscriptionActive
                      ? "Active"
                      : "Not Active"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {user.jobHunterSubscription.subscriptionActive
                  ? format(
                      new Date(user.jobHunterSubscription.subscriptionEndDate), // Pass only the date string
                      "dd MMMM yyyy", // Format string
                    )
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
