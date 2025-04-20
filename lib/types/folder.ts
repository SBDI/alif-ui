import { Resource } from './resource';

export interface Folder {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  resources?: Resource[];
  resourceCount?: number;
}
