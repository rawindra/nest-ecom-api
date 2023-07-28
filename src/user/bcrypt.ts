import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
