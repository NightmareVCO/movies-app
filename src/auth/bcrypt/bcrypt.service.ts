// bcrypt.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { to } from 'src/utils/to';

@Injectable()
export class BcryptService {
  async createHashedPassword(password: string): Promise<string> {
    const [hashedPassword, error] = await to<string>(bcrypt.hash(password, 10));
    if (error) throw new Error(`Error hashing password: ${String(error)}`);

    return hashedPassword;
  }

  async checkPasswordMatch(params: {
    inputPassword: string;
    userPassword: string;
  }): Promise<boolean> {
    const { inputPassword, userPassword } = params;

    const [isPasswordValid, error] = await to<boolean>(
      bcrypt.compare(inputPassword, userPassword),
    );
    if (error) throw new Error(`Error comparing passwords: ${String(error)}`);

    return isPasswordValid;
  }
}
