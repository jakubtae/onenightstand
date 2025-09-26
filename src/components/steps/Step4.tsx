import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Response } from "@/lib/response";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ReasonAndRulesFormData } from "../QuestionnaireFlow";
import { UseFormReturn } from "react-hook-form";

interface Step4ResponseProps {
  form: UseFormReturn<ReasonAndRulesFormData>;
  name: string;
  selectedResponse: Response;
  rules: string;
  reason: string;
  onSubmit: (data: ReasonAndRulesFormData) => void;
  onBack: () => void;
}

export const Step4 = ({ form, onSubmit, onBack }: Step4ResponseProps) => {
  return (
    <motion.div
      key="step5"
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
          <div className="space-y-4">
            {/* Headline Input */}
            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700 text-lg">
                    4. Okay, no magic wands here. What&apos;s one or two small
                    rules you&apos;re actually willing to live by?
                    <br />
                    <span className="text-sm font-normal text-gray-600">
                      (Don&apos;t overthink it, just type it. I&apos;ll clean it
                      up for you.)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your rules here..."
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700 text-lg">
                    5. Every comeback needs a battle cry. What&apos;s yours?
                    <br />
                    <span className="text-sm font-normal text-gray-600">
                      (Don&apos;t have one? I&apos;ll cook something up.)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your reason why here..."
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 py-3"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
