import { ZodTypeAny, z } from 'zod'

import { Category } from '~/types/questionnaire';

export const generateSchema = (questionnaire: Category[], overriddenPossibleValues: string[]) => {
  const schemaFields: { [key: string]: ZodTypeAny } = {
    userId: z.string().uuid(),
  };

  questionnaire.forEach(category => {
    category.questions.forEach(question => {
      if (question.type === 'email') {
        schemaFields[question.question] = z.string({
          required_error: 'Email is required',
        }).email();
      } else if (question.type === 'number') {
        schemaFields[question.question] = z.number().int().min(question.minValue).max(question.maxValue);
      } else if (question.type === 'likert') {
        schemaFields[question.question] = z.number().int().min(1).max(question.subtype);
      } else if (question.type === 'choice' || question.type === 'select') {
        const possibleValues = question.options?.map(option => option.toLowerCase().trim()) ?? overriddenPossibleValues
        schemaFields[question.question] = z.string().refine(value => possibleValues.includes(value), {
          message: 'Invalid value',
        });
      } else if (question.type === 'text') {
        schemaFields[question.question] = z.string({
          required_error: 'This field is required',
        });
      }
    });
  });

  return z.object(schemaFields);
}