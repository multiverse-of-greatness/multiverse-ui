import { z } from "zod";

export const CharacterDataJson = z.object({
  id: z.union([z.string(), z.number()]),
  first_name: z.string(),
  last_name: z.string(),
  species: z.string(),
  age: z.union([z.number(), z.string()]),
  gender: z.string(),
  role: z.string(),
  background: z.string(),
  place_of_birth: z.string(),
  physical_appearance: z.array(z.string()),
  image: z.string().nullable(),
  original_image: z.string().nullable(),
});

export class CharacterData {
  id: string | number;
  firstName: string;
  lastName: string;
  species: string;
  age: string | number;
  gender: string;
  role: string;
  background: string;
  placeOfBirth: string;
  physicalAppearance: string[];
  image: string | null;
  originalImage: string | null;

  constructor(
    id: string | number,
    firstName: string,
    lastName: string,
    species: string,
    age: string | number,
    gender: string,
    role: string,
    background: string,
    placeOfBirth: string,
    physicalAppearance: string[],
    image: string | null = null,
    originalImage: string | null = null,
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

  static fromJson(jsonObj: z.infer<typeof CharacterDataJson>): CharacterData {
    const parsed = CharacterDataJson.parse(jsonObj);

    return new CharacterData(
      parsed.id,
      parsed.first_name,
      parsed.last_name,
      parsed.species,
      parsed.age,
      parsed.gender,
      parsed.role,
      parsed.background,
      parsed.place_of_birth,
      parsed.physical_appearance,
      parsed.image,
      parsed.original_image,
    );
  }

  toJson(): z.infer<typeof CharacterDataJson> {
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
      original_image: this.originalImage,
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
