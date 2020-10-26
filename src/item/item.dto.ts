// import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { Item } from '../model/item.entity';
import { UserDTO } from './user.dto';

export class ItemDTO implements Readonly<ItemDTO> {
  // @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  // @ApiModelProperty({ required: true })
  @IsString()
  name: string;

  // @ApiModelProperty({ required: true })
  @IsString()
  description: string;

  public static from(dto: Partial<ItemDTO>) {
    const it = new ItemDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Item) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
    });
  }

  public toEntity(user: UserDTO = null) {
    const it = new Item();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createDateTime = new Date();
    it.createdBy = user ? user.id : null;
    it.lastChangedBy = user ? user.id : null;
    return it;
  }
}
