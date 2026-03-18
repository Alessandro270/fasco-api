import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from 'src/mail/mail.service';
import { OTP } from 'otplib';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  private otp: OTP;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.otp = new OTP();
  }

  async signup(createUserDto: CreateUserDto) {
    if (await this.userService.findWithPassword({ email: createUserDto.email }))
      throw new BadRequestException('Email já existente');
    const password = await bcrypt.hash(createUserDto.password, 12);

    const user = await this.userService.create({ ...createUserDto, password });
    const payload = { id: user._id, sub: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findWithPassword({
      email: loginDto.email,
    });

    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    if (!(await bcrypt.compare(loginDto.password, user.password)))
      throw new UnauthorizedException('Credenciais inválidas');
    const payload = { id: String(user._id), sub: user.email };

    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async sendOtp(dto: ForgotPasswordDto) {
    const user = await this.userService.findWithOtpSecret({ email: dto.email });
    if (!user) throw new NotFoundException('Email não existente');

    let otpSecret: string = '';

    if (!user.otpSecret) {
      otpSecret = this.otp.generateSecret();
      await this.userService.update(user.id, { otpSecret });
    } else otpSecret = user.otpSecret;

    const otpCode = await this.otp.generate({ secret: otpSecret });

    const result = await this.mailService.sendMail({
      recipients: [user.email],
      subject: 'Codigo de validação otp',
      text: `O seu código de validação OTP é: ${otpCode}`,
    });
    return result;
  }

  async validateOtp(dto: VerifyOtpDto) {
    const user = await this.userService.findWithOtpSecret({ email: dto.email });
    if (!user) throw new NotFoundException('Email não encontrado');
    const otpSecret = user.otpSecret;
    const validOtp = await this.otp.verify({
      token: dto.otp,
      secret: otpSecret ?? '',
    });
    if (!validOtp) throw new BadRequestException('Código otp inválido');
    const resetToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      { expiresIn: '10m' },
    );
    return resetToken;
  }

  async resetPassword(dto: ResetPasswordDto) {
    const payload = await this.jwtService.verifyAsync(dto.resetToken);
    const user = await this.userService.findOne(payload.id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    if (dto.newPassword !== dto.newPasswordConfirm)
      throw new BadRequestException('Senhas diferentes');
    await this.userService.update(String(user._id), {
      password: await bcrypt.hash(dto.newPassword, 12),
    });
    return { message: 'Senha resetada com sucesso' };
  }
}
