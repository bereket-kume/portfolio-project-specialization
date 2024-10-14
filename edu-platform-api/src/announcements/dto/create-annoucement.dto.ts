import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  communityId: string;

  @IsNotEmpty()
  @IsString()
  creatorID: string;
}
