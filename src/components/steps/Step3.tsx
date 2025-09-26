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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { HeadlineFormData } from "../QuestionnaireFlow";
import { UseFormReturn } from "react-hook-form";

interface Step3ResponseProps {
  form: UseFormReturn<HeadlineFormData>;
  name: string;
  selectedResponse: Response;
  onSubmit: (data: HeadlineFormData) => void;
  onBack: () => void;
}

export const Step3 = ({ form, onSubmit, onBack }: Step3ResponseProps) => {
  return (
    <motion.div
      key="step3"
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
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700 text-lg">
                    3. What&apos;s the big comeback headline you&apos;re
                    chasing?
                    <br />
                    <span className="text-sm font-normal text-gray-600">
                      (Don&apos;t overthink it, just type it. I&apos;ll clean it
                      up for you.)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your headline here..."
                      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tone Selection */}
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700 text-lg">
                    3b. And how do you want me to talk to you?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="strict">
                        Strict - Direct and no-nonsense
                      </SelectItem>
                      <SelectItem value="motivational">
                        Motivational - Encouraging and inspiring
                      </SelectItem>
                      <SelectItem value="supportive">
                        Supportive - Gentle and understanding
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
