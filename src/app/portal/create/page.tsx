"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StepBasic } from "./_components/step-basic";
import { StepKeywords } from "./_components/step-keywords";
import { StepPlatforms } from "./_components/step-platforms";
import { type CreateProjectFormData, defaultFormData } from "@/types/create-project";

const STEPS = [
  { id: 1, name: "Basic", description: "Project details" },
  { id: 2, name: "Keywords", description: "Search terms" },
  { id: 3, name: "Platforms", description: "Data sources" },
];

export default function CreateProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateProjectFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<CreateProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length >= 3;
      case 2:
        return formData.primaryKeywords.length >= 1;
      case 3:
        return Object.values(formData.platforms).some(Boolean);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock create - redirect to new project
    const newTopicId = "topic-new-" + Date.now();
    router.push(`/${newTopicId}/issue-monitoring/overview`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Link */}
      <Link
        href="/portal/projects"
        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Projects
      </Link>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      currentStep > step.id
                        ? "bg-blue-600 text-white"
                        : currentStep === step.id
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                    }
                  `}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className="text-xs mt-2 text-slate-500">{step.name}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`
                    w-16 sm:w-24 h-1 mx-2
                    ${currentStep > step.id ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Create New Project</h1>
          <p className="text-slate-500">
            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].description}
          </p>
        </CardHeader>

        <CardContent>
          {currentStep === 1 && <StepBasic data={formData} onChange={updateFormData} />}
          {currentStep === 2 && <StepKeywords data={formData} onChange={updateFormData} />}
          {currentStep === 3 && <StepPlatforms data={formData} onChange={updateFormData} />}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={currentStep === 1 ? () => router.push("/portal/projects") : handleBack}>
            {currentStep === 1 ? (
              "Cancel"
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </>
            )}
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Create Project
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
