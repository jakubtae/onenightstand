"use client";
import { ProblemsReframed } from "@/lib/problemsReframed";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const ReframingForm = () => {
  const [selectedReframe, setSelectedReframe] = useState<any>(null);
  const previousQuickFixRef = useRef<string | null>(null);
  const problemName = [
    ...new Set(ProblemsReframed.map((problem) => problem.problem)),
  ] as [string, ...string[]];

  const ReframingFormSchema = z.object({
    problem: z.enum(problemName),
  });

  type ReframingFormData = z.infer<typeof ReframingFormSchema>;

  const form = useForm<ReframingFormData>({
    mode: "onChange",
    defaultValues: {
      problem: problemName[0],
    },
  });

  const onSubmit = (data: ReframingFormData) => {
    const matchingProblems = ProblemsReframed.filter(
      (item) => item.problem === data.problem
    );

    if (matchingProblems.length > 0) {
      let randomReframe;
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loop

      do {
        const randomIndex = Math.floor(Math.random() * matchingProblems.length);
        randomReframe = matchingProblems[randomIndex];
        attempts++;

        // If we've tried too many times, just use what we have
        if (attempts >= maxAttempts) {
          break;
        }
      } while (
        matchingProblems.length > 1 &&
        randomReframe.quickFix === previousQuickFixRef.current
      );

      setSelectedReframe(randomReframe);
      previousQuickFixRef.current = randomReframe.quickFix;
    } else {
      setSelectedReframe(null);
      previousQuickFixRef.current = null;
    }
  };

  const handleSelectChange = (value: string) => {
    // Clear the current reframe when select changes
    setSelectedReframe(null);
    previousQuickFixRef.current = null;
    form.setValue("problem", value as any);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {/* Problem Selection */}
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700 text-sm">
                  Choose your problem
                </FormLabel>
                <Select
                  onValueChange={handleSelectChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Choose your problem" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {problemName.map((problem, i) => (
                      <SelectItem value={problem} key={i} className="text-sm">
                        <span className="break-words whitespace-normal">
                          {problem}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" variant="default" className="w-full">
            {selectedReframe ? "Get another solution" : "Get a solution"}
          </Button>
        </form>
      </Form>

      {/* Display the selected reframe with animations */}
      <AnimatePresence mode="wait">
        {selectedReframe && (
          <motion.div
            key={selectedReframe.quickFix}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <h4 className="font-medium text-gray-700 text-sm mb-1">
              Quick Fix:
            </h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="text-gray-600 text-sm leading-relaxed break-words"
            >
              {selectedReframe.quickFix}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
