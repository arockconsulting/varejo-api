import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth') // Define o prefixo dos endpoints como '/auth'
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Protege o endpoint com a estratégia local
  @Post('login') // Define a rota POST /auth/login
  async login(@Request() req) {
    return this.authService.login(req.user); // Retorna o token JWT
  }
}
