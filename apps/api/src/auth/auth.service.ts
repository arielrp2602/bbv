import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private ps: PrismaService,
    private jwtService: JwtService,
    private cs: ConfigService,
  ) {}

  private signToken(id: string, name: string, email: string, role: Role) {
    const payload = {
      sub: id,
      name,
      email,
      role,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.cs.get<string>('JWT_SECRET'),
      expiresIn: '5h',
    });

    return { access_token: token };
  }

  async register(data: RegisterDto) {
    const exists = await this.ps.user.findUnique({
      where: { email: data.email },
    });

    if (exists) throw new ConflictException('Este correo ya está en uso');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.ps.user.create({
      data: {
        ...data,
        password: hashed,
      },
    });

    return this.signToken(user.id, user.name, user.email, user.role);
  }

  async login(data: LoginDto) {
    const user = await this.ps.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) throw new UnauthorizedException('Credenciales incorrectas');

    return this.signToken(user.id, user.name, user.email, user.role);
  }
}
