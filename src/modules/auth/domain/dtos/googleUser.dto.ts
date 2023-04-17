export interface GoogleUserDto {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface GoogleUserRequestDto {
  user: GoogleUserDto;
}
