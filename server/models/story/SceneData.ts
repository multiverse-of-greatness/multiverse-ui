export type SceneDataJson = {
  id: number;
  title: string;
  location: string;
  description: string;
  image?: string | null;
};

export class SceneData {
  id: number;
  title: string;
  location: string;
  description: string;
  image?: string | null;

  constructor(id: number, title: string, location: string, description: string, image: string | null = null) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.description = description;
    this.image = image;
  }

  static fromJson(jsonObj: SceneDataJson): SceneData {
    return new SceneData(jsonObj.id, jsonObj.title, jsonObj.location, jsonObj.description, jsonObj.image);
  }

  toJson(): SceneDataJson {
    return {
      id: this.id,
      title: this.title,
      location: this.location,
      description: this.description,
      image: this.image
    };
  }

  toString(): string {
    return (
      `SceneData(id=${this.id}, title=${this.title}, location=${this.location}, description=${this.description}, ` +
      `image=${this.image})`
    );
  }
}
