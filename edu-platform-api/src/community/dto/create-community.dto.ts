import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommunityDto {
  
  @ApiProperty({ description: 'The name of the community', example: 'Tech Innovators' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the community', example: 'A community for tech enthusiasts' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Specifies if the community is premium', default: false })
  @IsBoolean()
  @IsOptional()
  isPremium?: boolean = false;

  @ApiProperty({ description: 'Price for premium members (optional)', example: 9.99, default: 0 })
  @IsNumber()
  @IsOptional()
  price?: number = 0;
}
