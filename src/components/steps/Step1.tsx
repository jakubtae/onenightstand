import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { NameFormData } from "../QuestionnaireFlow";
interface Step1NameProps {
  form: UseFormReturn<NameFormData>;
  onSubmit: (data: NameFormData) => void;
}

export const Step1 = ({ form, onSubmit }: Step1NameProps) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg lg:text-xl font-semibold text-gray-700">
                  1. What&apos;s your name?
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row gap-3 justify-between items-center">
                    <Input
                      placeholder="Enter your name"
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-full bg-white"
                      {...field}
                    />
                    <Button
                      type="submit"
                      className="flex h-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                      }
                    >
                      Next
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </motion.div>
  );
};
