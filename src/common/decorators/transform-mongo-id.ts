import { Transform } from 'class-transformer';

export function TransformMongoId() {
  return (target: any, propertyKey: string) => {
    Transform((params) => params.obj[propertyKey]?.toString())(target, propertyKey);
  };
}
