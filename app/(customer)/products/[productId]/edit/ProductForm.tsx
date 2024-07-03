// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   useZodForm,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { createProductAction } from "./product.action";
// import { GRADIENT_CLASSES, ProductSchema, ProductType } from "./product.schema";

// export type ProductFormProps = {
//   defaultValues?: ProductType;
// };

// export const ProductForm = (props: ProductFormProps) => {
//   const form = useZodForm({
//     schema: ProductSchema,
//     defaultValues: props.defaultValues || {},
//   });

//   const isCreate = !Boolean(props.defaultValues);
//   const router = useRouter();

//   const mutation = useMutation({
//     mutationFn: async (values: ProductType) => {
//       console.log("Calling createProductionAction with values:", values);
//       const { data, serverError } = await createProductAction(values);
//       console.log("createProductAction response:", { data, serverError });
//       if (serverError || !data) {
//         toast.error(serverError);
//         return;
//       }

//       toast.success("Product created");
//       router.push(`/products/${data.id}`);
//     },
//   });

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           {isCreate
//             ? "Create Product"
//             : `Edit product ${props.defaultValues?.name}`}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4">
//         <Form
//           className="flex flex-col gap-4"
//           form={form}
//           onSubmit={async (values) => {
//             console.log("Submitting values: ", values);
//             await mutation.mutateAsync(values);
//           }}
//         >
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="iPhone 15"
//                     {...field}
//                     defaultValue={field.value || ""}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   The name of the public review.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="backgroundColor"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Background color</FormLabel>
//                 <FormControl>
//                   <Select
//                     value={field.value || ""}
//                     onValueChange={(value) => field.onChange(value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue></SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       {GRADIENT_CLASSES.map((gradient) => (
//                         <SelectItem
//                           value={gradient}
//                           key={gradient}
//                           className="flex"
//                         >
//                           <div
//                             className={cn(
//                               gradient,
//                               "block w-80 h-8 rounded-md flex-1"
//                             )}
//                           ></div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormDescription>
//                   The review page background color
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">
//             {isCreate ? "Create prodct" : "Save product"}
//           </Button>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProductAction } from "./product.action";
import { GRADIENT_CLASSES, ProductSchema, ProductType } from "./product.schema";

export type ProductFormProps = {
  defaultValues?: ProductType;
};

export const ProductForm = (props: ProductFormProps) => {
  const form = useZodForm({
    schema: ProductSchema,
    defaultValues: props.defaultValues || {
      name: "",
      noteText: "",
      informationText: "",
      reviewText: "",
      thanksText: "",
      backgroundColor: "",
    },
  });

  const isCreate = !Boolean(props.defaultValues);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: ProductType) => {
      try {
        console.log("Calling createProductionAction with values:", values);
        const { data, serverError } = await createProductAction(values);
        console.log("createProductAction response:", { data, serverError });
        if (serverError || !data) {
          toast.error(serverError);
          return;
        }

        toast.success("Product created");
        router.push(`/products/${data.id}`);
      } catch (error: any) {
        if (error.message === "Slug already exists") {
          form.setError("slug", {
            type: "manual",
            message: "This slug is already in use. Please choose another.",
          });
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate
            ? "Create Product"
            : `Edit product ${props.defaultValues?.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form
          className="flex flex-col gap-4"
          form={form}
          onSubmit={async (values) => {
            console.log("Submitting values: ", values);
            await mutation.mutateAsync(values);
          }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="iPhone 15" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the public review.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="iphone"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replaceAll(" ", "-")
                        .toLowerCase();

                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The slug is used in the URL of the review page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background color</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a background color" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADIENT_CLASSES.map((gradient) => (
                        <SelectItem
                          value={gradient}
                          key={gradient}
                          className="flex"
                        >
                          <div
                            className={cn(
                              gradient,
                              "block w-80 h-8 rounded-md flex-1"
                            )}
                          ></div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  The review page background color
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{isCreate ? "Create product" : "Save product"}</Button>
        </Form>
      </CardContent>
    </Card>
  );
};
