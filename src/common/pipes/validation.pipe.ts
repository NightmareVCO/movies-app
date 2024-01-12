import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.log(
        '🚀 ~ ZodValidationPipe ~ transform ~ this.schema:',
        this.schema,
      );
      console.log('🚀 ~ ZodValidationPipe ~ transform ~ value:', value);
      throw new BadRequestException(error, 'Validation failed');
    }
  }
}
