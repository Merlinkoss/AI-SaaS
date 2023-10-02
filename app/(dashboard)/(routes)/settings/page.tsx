import GenerationCounter from "@/components/generation-counter";
import Heading from "@/components/heading";
import { getCurrentApiUsage, getMaxAvailableApiUsage } from "@/lib/api-limit";
import { SETTINGS } from "@/app/features";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPaymentHistory } from "@/lib/payment";
import { auth } from "@clerk/nextjs";

const SettingsPage = async () => {
  const { userId } = await auth();
  const currentApiUsage = await getCurrentApiUsage();
  const maxAvailableApi = await getMaxAvailableApiUsage();
  const userPaymentHistrory = await getPaymentHistory();

  return (
    <div>
      <Heading
        title={SETTINGS.label}
        description={SETTINGS.description + userId}
        icon={SETTINGS.icon}
        iconColor={SETTINGS.color}
        bgColor={SETTINGS.bgColor}
      />
      <div className="px-4 lg:px-8 space-y-4">
        <GenerationCounter
          currentApiUsage={currentApiUsage}
          maxAvailableApi={maxAvailableApi}
        />
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>OrderId</TableHead>
              <TableHead className="text-right">Generation</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPaymentHistrory?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell className="text-right">{payment.amount}</TableCell>
                <TableCell className="text-right">{payment.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SettingsPage;
