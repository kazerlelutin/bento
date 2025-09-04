import { describe, expect, it } from "bun:test";
import { crafterNavigatorStore, setCurrentStep } from "./crafter-navigator.store";
import { steps } from "./crafter.navigator.const";
import type { Step } from "./crafter-navigator.types";

describe('setCurrentStep', () => {
  it('should set current step when valid stepName', () => {
    const currentStep = steps.find(s => s.name === 'base') as Step;
    setCurrentStep(currentStep.name);
    expect(crafterNavigatorStore.currentStep).toBe(currentStep);
  });

  it('should throw error when invalid stepName', () => {
    expect(() => setCurrentStep('invalid')).toThrow('Step invalid not found');
  });
});