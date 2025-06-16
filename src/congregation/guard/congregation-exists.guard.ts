import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CongregationService } from '../congregation.service';

@Injectable()
export class CongregationExistsGuard implements CanActivate {
  constructor(private readonly congregationService: CongregationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const congregationId: string = request.params['congregationId'];
    if (!congregationId) {
      return Promise.resolve(true);
    }
    const exist = await this.congregationService.exists(congregationId);
    if (!exist) {
      throw new NotFoundException(
        `Could not find congregation with id ${congregationId}`,
      );
    }
    return Promise.resolve(true);
  }
}
