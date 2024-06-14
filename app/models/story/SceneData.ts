import { z } from "zod";

export const SceneDataJson = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string().nullable(),
});

export class SceneData {
  id: string | number;
  title: string;
  location: string;
  description: string;
  image: string | null;

  constructor(
    id: string | number,
    title: string,
    location: string,
    description: string,
    image: string | null = null,
  ) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.description = description;
    this.image = image;
  }

  static fromJson(jsonObj: z.infer<typeof SceneDataJson>): SceneData {
    const parsed = SceneDataJson.parse(jsonObj);
    return new SceneData(
      parsed.id,
      parsed.title,
      parsed.location,
      parsed.description,
      parsed.image,
    );
  }

  toJson(): z.infer<typeof SceneDataJson> {
    return {
      id: this.id,
      title: this.title,
      location: this.location,
      description: this.description,
      image: this.image,
    };
  }

  toString(): string {
    return (
      `SceneData(id=${this.id}, title=${this.title}, location=${this.location}, description=${this.description}, ` +
      `image=${this.image})`
    );
  }
}
