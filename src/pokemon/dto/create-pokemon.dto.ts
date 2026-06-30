import { IsInt, IsPositive, IsString, MinLength, Min } from "class-validator";

export class CreatePokemonDto {

    //IsInt, IsPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    //IsString, MinLength 1
    @IsString()
    @MinLength(1)
    name: string;
}
