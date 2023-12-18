import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Textarea } from "../textarea";

const renderFormField = (form: any, item: FormFieldConfig | ChangePassFieldConfig | ContactFieldConfig) =>
  item && (
    <FormField
      key={item.name}
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem>
          {item.label && <FormLabel>{item.label}</FormLabel>}
          <FormControl>{item.name === "message" ? <Textarea {...field} {...item} /> : <Input {...field} {...item} />}</FormControl>
          {item.description && <FormDescription>{item.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );

export default renderFormField;
