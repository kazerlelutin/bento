import { describe, expect, it } from "bun:test";
import { crafterNavigatorStore, setCurrentStep } from "./crafter-navigator.store";
import { steps } from "./crafter.navigator.const";
import type { Step } from "./crafter-navigator.types";

describe('setCurrentStep', () => {
  it('should set current step when valid stepId', () => {
    const currentStep = steps.find(s => s.id === '1') as Step;
    setCurrentStep(currentStep.id);
    expect(crafterNavigatorStore.currentStep).toBe(currentStep);
  });

  it('should throw error when invalid stepId', () => {
    expect(() => setCurrentStep('invalid')).toThrow('Step not found');
  });
});