export interface IHashTagData {
  color: string;
  text: string;
}

export interface IHashTag extends IHashTagData {
  id: string;
  created: string;
}

export interface IHashTagsService {
  createHashTag: (payload: IHashTagData) => Promise<IHashTag>;
  editHashTag: (payload: IHashTag) => Promise<IHashTag>;
  findAll: () => Promise<IHashTag[]>;
}
