import { useState, useEffect } from "react"; // Agregamos useEffect
import { z } from "zod";

// 1. Esquema de validación estricto
const checkoutSchema = z.object({
  name: z.string().min(3, "Ingresa tu nombre completo"),
  phone: z.string().regex(/^9\d{8}$/, "El celular debe tener 9 dígitos y empezar con 9"),
  district: z.string().min(1, "Selecciona tu distrito"),
  address: z.string().min(5, "La dirección es muy corta, detalla más"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const useCheckoutForm = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    district: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  // Nuevo estado para el "semáforo" general
  const [isValid, setIsValid] = useState(false);

  // 2. Lógica de cambio con validación en tiempo real
  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    const result = checkoutSchema.shape[field].safeParse(value);
    
    if (result.success) {
      // Si está bien, borramos el error por completo (undefined)
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } else {
      // Si falla, guardamos el mensaje
      setErrors((prev) => ({ ...prev, [field]: result.error.issues[0].message }));
    }
  };

  // 3. RECALCULAR VALIDACIÓN (El Fix Maestro)
  // Cada vez que cambien los datos o los errores, verificamos si todo está verde.
  useEffect(() => {
    const noActiveErrors = Object.values(errors).every((err) => !err); // Que no existan mensajes de error
    const allFieldsFilled = Object.values(formData).every((val) => val.trim().length > 0); // Que nada esté vacío

    setIsValid(noActiveErrors && allFieldsFilled);
  }, [formData, errors]);

  const validateAll = (): boolean => {
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: any = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return false;
    }
    return true;
  };

  return { 
    formData, 
    errors, 
    handleChange, 
    validateAll, 
    isValid // Ahora este valor es 100% real
  };
};