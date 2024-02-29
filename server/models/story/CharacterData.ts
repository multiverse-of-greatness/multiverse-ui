export type CharacterDataJson = {
  id: number;
  first_name: string;
  last_name: string;
  species: string;
  age: string;
  gender: string;
  role: string;
  background: string;
  place_of_birth: string;
  physical_appearance: string[];
  image?: string | null;
  original_image?: string | null;
};

export class CharacterData {
  id: number;
  firstName: string;
  lastName: string;
  species: string;
  age: string;
  gender: string;
  role: string;
  background: string;
  placeOfBirth: string;
  physicalAppearance: string[];
  image?: string | null;
  originalImage?: string | null;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    species: string,
    age: string,
    gender: string,
    role: string,
    background: string,
    placeOfBirth: string,
    physicalAppearance: string[],
    image: string | null = null,
    originalImage: string | null = null
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.species = species;
    this.age = age;
    this.gender = gender;
    this.role = role;
    this.background = background;
    this.placeOfBirth = placeOfBirth;
    this.physicalAppearance = physicalAppearance;
    this.image = image;
    this.originalImage = originalImage;
  }

  setImage(image: string): void {
    this.image = image;
  }

  setOriginalImage(originalImage: string): void {
    this.originalImage = originalImage;
  }

  static fromJson(jsonObj: CharacterDataJson): CharacterData {
    return new CharacterData(
      jsonObj.id,
      jsonObj.first_name,
      jsonObj.last_name,
      jsonObj.species,
      jsonObj.age,
      jsonObj.gender,
      jsonObj.role,
      jsonObj.background,
      jsonObj.place_of_birth,
      jsonObj.physical_appearance,
      jsonObj.image ?? null,
      jsonObj.original_image ?? null
    );
  }

  toJson(): CharacterDataJson {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      species: this.species,
      age: this.age,
      gender: this.gender,
      role: this.role,
      background: this.background,
      place_of_birth: this.placeOfBirth,
      physical_appearance: this.physicalAppearance,
      image: this.image,
      original_image: this.originalImage
    };
  }

  toString(): string {
    return (
      `CharacterData(id=${this.id}, first_name=${this.firstName}, last_name=${this.lastName}, ` +
      `species=${this.species}, age=${this.age}, gender=${this.gender}, role=${this.role}, ` +
      `background=${this.background}, place_of_birth=${this.placeOfBirth}, ` +
      `physical_appearance=${this.physicalAppearance}, image=${this.image}, ` +
      `original_image=${this.originalImage})`
    );
  }
}
