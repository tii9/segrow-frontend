"use client";

import { useForm } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/toast";
import TopNavbar from "~/components/navbar/TopNavbar";
import { ApiErrorResponse } from "~/lib/axios";
import { useCreateAddress } from "~/features/profile/api/createAddress";

export enum SalatigaDistrict {
  ARGOMULYO = "Argomulyo",
  SIDOMUKTI = "Sidomukti",
  SIDOREJO = "Sidorejo",
  TINGKIR = "Tingkir",
}

export const newAddressSchema = z.object({
  recipient: z
    .string()
    .min(1, "Nama penerima wajib diisi")
    .max(100, "Nama penerima maksimal 100 karakter"),

  phone: z
    .string()
    .min(1, "Nomor telepon wajib diisi")
    .max(100, "Nomor telepon maksimal 100 karakter")
    .regex(/^(\+62|62|0)8[1-9][0-9]{9,15}$/, {
      message: "Nomor telepon tidak valid",
    }),

  detail: z
    .string()
    .min(1, "Detail alamat wajib diisi")
    .max(20, "Detail alamat maksimal 20 karakter"),

  city: z.string().max(50, "Kota maksimal 50 karakter"),

  district: z.enum(SalatigaDistrict, {
    message: "Kecamatan tidak valid",
  }),

  street: z.string().min(1, "Jalan wajib diisi"),

  notes: z.string(),
});

// type NewAddressFormValues = z.infer<typeof newAddressSchema>;

const CreateAddressPage = () => {
  const router = useRouter();

  const { mutate: createAddressMutation, isPending: createAddressLoading } =
    useCreateAddress({
      mutationConfig: {
        onError: (error) => {
          const err = error as AxiosError<ApiErrorResponse>;
          toast.add({
            type: "error",
            description: err.response?.data.message,
          });
        },
        onSuccess: () => {
          router.push("/account/address");
        },
      },
    });

  const handleCreateAddress = (value: z.infer<typeof newAddressSchema>) => {
    createAddressMutation(value);
  };

  const form = useForm({
    defaultValues: {
      recipient: "",
      phone: "",
      detail: "",
      city: "Salatiga",
      district: "",
      street: "",
      notes: "",
    },
    validators: {
      onSubmit: newAddressSchema,
    },
    onSubmit: async ({ value }) => {
      const district = value.district as SalatigaDistrict;

      handleCreateAddress({ ...value, district });
    },
  });

  return (
    <div className="bg-white min-h-screen pb-20">
      <TopNavbar header="Buat Alamat Baru" />
      <div className="px-4 pt-4">
        <form
          id="create-new-address"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="recipient">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nama Penerima</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Windah Basudara"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>No HP Penerima</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="081234567890"
                      autoComplete="off"
                      type="tel"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="detail">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Detail (penanda alamat)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Contoh: Rumah, Apartemen, Gedung, dll."
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="city">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Kota</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Contoh: Salatiga"
                        autoComplete="off"
                        readOnly
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="district">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Kecamatan</FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) =>
                          field.handleChange(value as SalatigaDistrict)
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          onBlur={field.handleBlur}
                        >
                          <SelectValue placeholder="Pilih kecamatan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.values(SalatigaDistrict).map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
            <form.Field name="street">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Detail jalan</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Contoh: Jl. Diponegoro No. 123"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="notes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Catatan</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Contoh: Dekat SPBU, Samping minimarket, dll. (opsional)"
                      autoComplete="off"
                      rows={3}
                      className="resize-none"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <Button
            type="submit"
            id="create-new-address"
            className="mt-4 w-full rounded-full py-5"
            disabled={createAddressLoading}
          >
            Simpan Alamat
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAddressPage;
