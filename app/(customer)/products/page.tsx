import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/prisma";
import { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const products = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <Layout>
      <LayoutTitle>Products</LayoutTitle>
      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableHead>Name</TableHead>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Layout>
  );
}
