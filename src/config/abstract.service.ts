import { Repository, UpdateResult, DeleteResult } from 'typeorm';

export class AbstractService<T> {
  protected _model: Repository<T>;

  constructor(model: Repository<T>) {
    this._model = model;
  }

  public async create(doc): Promise<T> {
    return this._model.save(doc);
  }

  public async findOne(filter?): Promise<T> {
    return this._model.findOne({ where: filter });
  }

  public async find(filter?): Promise<T[]> {
    return this._model.find(filter);
  }

  public async update(id: number, updateDoc: object): Promise<UpdateResult> {
    return this._model.update(id, updateDoc);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return this._model.delete(id);
  }
}
